- How to use what have been done.
- prerequisites ::  what versions of wash / wasm host / (rust targets ?) have to be 
- commons
    - serialization
    - error handling
    - builder
- inter-component communications
    - wrpc
    - build time composition vs runtime composition
- wasmcloud vs wasmtime
- current difficulties
---
# This file documents the summary of work done in order to migrate the application to web assembly version > V1.0 and component model
## Main changes:
1. The apotion of The WebAssembly component model as a broad-reaching architecture for building interoperable Wasm libraries, applications, and environments.
2. smithy interface language(IDL) has been deprecated in favor of [WIT IDL](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)
3. Access to low level system APIs are granted through WebAssembly System Interfaces [WASI](https://wasi.dev/) interfaces, written in wit, as well.
> __Note__ : One of the goals of this migration was to depend mainly on standard APIs and standard runtime ([wasmtime](https://wasmtime.dev/)), however, this goal was not possible at the current time, due to a set of reasons explained below
---
## Current Standing:
- due to the pause of the project, only these components have been migrated
    - rating agents:
        - aws-stor-rating-agent
        - orange-vod-metaverse-agent
        - orange-vod-rating-agent
        - streaming-rating-agent
        - video-rating-agent
    - usage coolectors
        - usage-collector-aws
        - usage-collector-orange
        - usage-collector-video-provider
        - usage-collector-dropbox
        - usage-collector-orange-connectivity
    - rating-coordinator
    - kv-balance-manager (balance-management in new directory)
    - API-gateway (partially due to the missing of remaining components)
- These are the points that needs investigation to be migrated to new version
    - CQRS approach for distributed data
        - the possibility of re-attempting using concordance 
        - or finding an alternate
- These are the points that has been marked as "complete but better to investigate for enhancement"
    - Error-handling: fix the error type hierarchy
    - Builder DSL: two models were implemented that need comparison and selecting one of them
- Topics that still needs investigation which does not have impact on migration
    - contract as code
    - deployment options for the new version
        - The use of purple OS
        - The possibility of suing IOT devices as a cluster, by utilizing the lightweight characteristics of wasm infrastructure.

## Highlights:
### 1. The usage of wasmcloud over wasmtime
- The initial plan was to use wasmtime as a runtime for the new app, as wasmtime is the standard wasm runtime, and all other frameworks use it as a base for their runtime. The motivation was to make the code as independant from specific providers to maintain portability.since all providers customize certain features to fit their infrastucture
- Unfortunately, wasmtime at the time of writing this documentation is still incomplete and missing some critical features, including some important WASI interfaces which in turn are still in draft phase and not in implementation phase yet.
- Before we take the decision to go back to wasmcloud, we tried to find workarounds for the problems, but unfortunately unsuccessfull
- More details about this topic can be found at the migration study in the [studies](./src/STUDIES/migration-towards-wasmv1.md) file
### 2. The Commons component:
- in the previous version, common functionalities were exposed to other wasm actors as rust crate, defined in cargo.toml
- in the newer version, according to the component model, all bahaviour should be exposed to components other than self through wit-defined interfaces, to ensure portability and interoperability at large scale, therefore, a special component was created which contains both wit interfaces and implementations for such common functionalities.
- due to the nature of this comonents, plus some limitations that exists in the runtime environment, the common component is not deployed as a standalone running component, rather, it is composed at build time with each component that depends on it.
- more information about the exposed interfaces and how-to use each interface can be found in the README file in the component source code
### 3. Inter-component communication
- Before migrating to wasmcloud, wasmtime supported only one way to communicate between components, that is to compose both components at build time to generate new wasm components which containes all features.
- Wasmcloud provided a mechanism to facilitate communication between separately deployed components, through the [WRPC Project](https://github.com/bytecodealliance/wrpc)
   - by only referncing the wit interface, wasmcloud is able to make a "behind the scene" wrpc call to the default implementation of that interface, defined in the wadm configuration file, assuming only one implementation exist
   - in the case where multiple implementations exist, we had to use wasmcloud specific APIs to manage the calls, other wise this would not be feasible
   - finally, the WRPC project contains some issues affecting component communication using user defined wit-types. mandating build time composition in that case using [WAC tool](https://github.com/bytecodealliance/wac). The composition in that case only is a workaround, not a design decision
   - <span style="font-weight: 700">To summarize</span>: we use runtime linking (wrpc) only to communicate between two deployed components __(by design)__. We use build time linking (composition) when sharing user defined type __(as a wrokaround)__, or when the depenant component is not deployable, like the commons __(by design)__
### 4. Current Challenges
- Continous evolution of the ecosystem
    - Most wasm projects,including wasmcloud, are not at a stable point, and keeps changing at a pace that causes request revision of the code, and sometimes disturb the development process itslef
    - examples:
        - many wasi interfaces are still at phase-1 or phase-2, meaning there is no standard implementation, and specific provider implementation is needed like wasmcloud
        - wasmcloud has made non-backward compatible to the project templates, also switched some dev-tools like wit-deps without explicit migration guide
        - wasmcloud is quickly adopting new rust targets, which caused disturpance during development cycle
- slow learning curve
    - new comers to the eco-system are requied to have in depth knowledge of many items, many of them are not trivial:
        - rust is the de-facto language for wasm developemnt, and even wit IDL quoted many concepts from rust, so a good knowledge of rust concepts is a must
        - The concepts of component model is a must to know in order to be able to go through and be able to develop across the vast eco system
    - the laguage used in the documentation is both quite academic and far from being easily readable
    - the structure of the documentation is pretty poor
    - the distribution of the repository of the tools for the ecosystem makes it harder to search for anwers properly

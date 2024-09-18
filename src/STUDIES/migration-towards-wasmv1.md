# Migration towards wasm v1 and wasi component model
## Objectives:
    1- explore the changes to the wasm echo-system after thr release of wasm 1.0 and adopting the component model and it tools
    2- suggest a strategy for migrating the existing code to the latest version of wasm
    3- attempt to make the migrated app compatible to and standard wasm standard runtime
## POC approach:
- The initial goal was to try create a very basic use case based on the rating agent old scenarios
    - [wasm-http-capability]->[**http-listener]->[**rating-agent]->[key-value-capability (redis)]
    - initial plan was not to target any wasm specific platform and use the standardized runtime (wasmtime) since it should be a reference to all platforms
    - suggested steps for dev:
        1. migrate the interface definitions from old "smithy IDL" to the new standard "wit IDL"
        2. create a simple http server (as an initial seed for an API gateway) as wasm component which implements wasi/http interface
        3. create a wasm component with basic rating-agent logic
        4. the rating agent should call the key-value store with an instnace of wasi/keyvalue interface
        5. call the rating agent from the http server
    - Challenges and resolutions:
        1. Smithy IDL and WIT IDL have a few in common, and currently there are no tools to automate the migration. we had to write the interface manually  => This is a one-time issue and shall impose no concern in the future development as all old interfaces are already migrated
        4. Managing WIT dependencies is not mature, even using tooll such as wit-deps, as all dependencies must be included inside the project directory.
        3. WIT IDL , and wit-bindgen (the tool responsible for creating language specific interfaces) are still missing features that can be (and was in our case) criritcal, like defining serializable entities
            - The current workaround for this was to copy all interface definitions into a duplicate definitions with implement both mapping functionalities to oiriginal entities and also serialization behavior
            - Despite being currently the most realistic solution, it carries many drawbacks, as any changes in the wit files will demand a repetion for such task for the modified entities, which is not a best practice
        3. An attempt to use javascript as an alternative to rust for developing one of the components, however the tools available that support languages other than rust are somehow behind the maurity level of those for rust. We had to switch back to rust
        4. [Blocker] At the current time of writing this document, most **"wasi"** interfaces are in draft phase and have no reference implementation for wasmtime, including **0wasi/keyvalue**, which currently only implemented im-memeory store. We attempted to create an implementation on our own, without success. That is why we were forced to switch back to use wasmcloud runtime and tooling.
        5. developing for wasmcloud, has a significant divergence from developing for the standard wasm runtime, and sometimes demands using wasmcloud specific dependencies



# Solutions - wasmCloud

![](https://cosmonic.com/images/blogs/2022/wasmcloud-from-edge-to-cloud.png)

## Pros & Cons

wasmCloud pro & cons of in the context of this prototype

- __pros__
    - robust and ubiquous connectivity, network mesh over IP (inherited from NATS)
    - zero-trust by design (as long as the runtime is secure): signed nodes, payloads & communications
    - efficient
    - event driven model, scalable, multi-region friendly
    - clean split between pure functions (ie. wasmCloud Actors) and internal states / outside world (ie. wasmCloud CapabilityProviders)
    - node runtime support many different hosts (vm, docker, k8s, browsers...)
    - polyglot platform (mostly Rust for now)

- __cons__
    - young technology (in the CNCF sandbox, but quite active)
    - opinionated PaaS approach
        - no oob support from hyperscalers
    - wip on orchestration / observability
    - important learning curve on development stack
        - rust as main programming language
        - cannot (or difficult to) leverage on existing rust framework
        - sometimes cryptic error messages
        - lack of extensive documentation

- __recommandations for this prototype__
    - use wasmCloud "at the egde", do not try to implement the whole solution with wasmCloud

## Main concepts

concept               | caracteristics
---                   | ---
host                  | or node, runtime on a host, erlang VM
lattice               | meshed netork, NATS
actors                | wasm payloads, stateless functions, implementing an interface
capability providers  | wasm payloads, stateful and attached to a node, offering services
links                 | declarative links between actors and capability providers
interface             | functionnal interface of an actor / capability

![dashboard](https://wasmcloud.com/images/blogs/ngs-global/dashboard.png)

## Resources

### main sites

- [wasmcloud.com](https://wasmcloud.com/) - links, articles
- [wasmcloud.dev](https://wasmcloud.dev/) - product documentation
- [cosmonic.com](https://cosmonic.com/) - the company that supports the opensource
- [nats.io](https://nats.io)

### documentation and trainings

- [wasmCloud doc](https://wasmcloud.dev/overview/)
- [NATS doc](https://docs.nats.io/)
- [Cosmonic: Introduction to wasmCloud & WebAssembly basics](https://labs.cosmonic.com/)
- [Linux Foundation: WebAssembly Actors: From Cloud to Edge](https://training.linuxfoundation.org/training/webassembly-actors-from-cloud-to-edge-lfd134x/)


### articles

- [Reflections on Three Years of wasmCloud, Kevin Hoffman](https://wasmcloud.com/blog/wasmcloud_third_anniversary/)
- [WebAssembly Components and wasmCloud Actors: A Glimpse of the Future, Taylor Thomas](https://wasmcloud.com/blog/webassembly_components_and_wasmcloud_actors_a_glimpse_of_the_future/)

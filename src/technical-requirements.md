# Technical requirements and questions (WIP)

## project specific

### fraud / risk analysis

- is there a risk of a rating-agent doing non-legitimate modifications of its associated bucket / an other bucket?

- if those risks are too high, can we have "server-side" rating agent proxy to mitigate them?

### stateless agents

- how to manage efficiently agents configuration in a stateless word? (caching mechanisms / via dedicated local capability providers?)

### interagent communication

- how to ensure an actor (rating agent for instance) only speak to its conterpart (collector agent for instance)

## wasmCloud generic

### keep the rating agent code public ?

- link between the source code and the wasmCloud actor on OCI regristry ?

### message delivery guarantee

- by design "naked NATS" does [not guarantee message delivery](https://docs.nats.io/nats-concepts/overview/compare-nats), does wasmCloud implement it?

### do interfaces support inheritance ?

### how to use links

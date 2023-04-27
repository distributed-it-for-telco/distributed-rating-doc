# Model

## Domain exploration

- 3 main actors
    - Service Consumer
    - Service Vendor
    - Service Provider

![](./model-overview.drawio.svg)

- concepts
    - rating engine
    - proofs
        - subscription
        - usage
        - identity

- offers
    - on usage
    - pre-paid
        - can an monthly subscription be seen as pre-paid?

- payments
    - 3 types
        - µ-transaction: no billing, 1 usage = 1 __immediate__ payment
        - post-paid: 1 usage = 1 __future__ payment on a bill
        - pre-paid: w/ bucket, 1 usage = 1 bucket update
    - in a 3-party interaction (user, vendor, provider)
        - either the provider has to trust the vendor to "recover user's paiments" 
            - needs pre-agreement or a base of trusted vendors) __DONT: incompatible w/ requirements__
        - either the vendor is paying the provider immediatly for the user's usage
        - either the vendor has already bought a "pre-paid bucket" to the provider

- B2B2C scenarios, bucket delegation
    - the vendor buys pre-paid bucket to the provider
        - it can split it among it's users
            - user is paying the usage directly to the provider
        - or decide to have an other payment type (µ-payment, billing)
            - vendor is paying the usage to the provider


### findings

- billing is a vendors responsibility, not a provider one
- it might be simplier (ie. support more scenarios) to always have a user>vendor>provider chain instead of a direct user>provider relation

### to be discussed

- entities modeling
    - are Service Vendors also service providers?
    - are service Vendors also service consumers?
    - implementation note: instead of inheritance we can use traits

- where shoud the usage proof go ?
    - service vendor / provider / both
    - avoid proxies

- similar / alternative approaches
    - [Distributed IoT Online Rating – The Global Rating Grid @mavoco.com](https://www.mavoco.com/cmp-connenctivity-management-platform/connectivity-online-usage-controller/)
    - are there research papers on the subject?
    - Shine (Orange internal project) third party use-cases
    
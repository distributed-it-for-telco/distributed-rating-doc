# Requirements

## Main problematics

- build a model that can support all scenarios of an open service ecosystem
    - vendors, aggregators, marketplaces, dynamic, as-a-service, recharging...

- establish a shared trust between the 3 main actors (Service Provider, Vendor and Consumer)
    - being able to distribute (crypto) proofs _of usage, of subscription..._
    - "good enought" security model, especially on the users devices

- fraud detection mecanism

## Use cases

Some base examples, they could be combined
- clients sharing the same bucket for a given service (eg. Friends and Family offers)
- vendors reselling bundles of services with a different tarification (eg. 30% on Netflix + OCS bundle)
- composite offer (eg. free dataplan for watching VOD service)
- context dependant offers (eg. free videoconference while being at a special event)
- sponsored services (eg. third party offering 20% coupons on VOD for two months)
- each client gets its personalized offer

## Workshop session 2022.09.16

> TODO reintegrate in requirements

- over-IP orientation

- decentralize the rule engine

- /!\ reconciliation issue > Fraud
    - does that necessarily imply having a centralized engine?
    - not necessarily
    - we can do sampling to "re-fail" on the server side to check that there is no suspicious behavior

- make the system robust to the fact that the vendor service can no longer "see flows"

- a service provider can itself be a service vendor (an aggregator...)

- apply the reting engine to which event

- in "self-service" mode, automatable, without prior human agreement between the service vendor and the service provider

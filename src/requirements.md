# Requirements

## Main problematics

- build a model that can support all scenarios of an open service ecosystem (B2B2X)
    - vendors, aggregators, marketplaces, dynamic, as-a-service, recharging...

- establish a shared trust between the 3 main actors (Service Provider, Vendor and Consumer)
    - being able to distribute (crypto) proofs _of usage, of subscription..._
    - "good enought" security model, especially on the users devices

- fraud detection mecanism

## Requirements

- the solution 
    - cannot rely on DPI to identify trafic usage (cf. HTTP2/3/QUIC)
    - is over-IP
    - implement (or is frendly to) fraud detection mecanisms and is auditable
    - does not require prior human agreement between the service vendor and the service provider (self-service)

- optionnally, the solution should
    - be compatible with a non reliable network (intermitent conncectivity, off-line mode)

## Use cases

Some base examples, they could be combined
- clients sharing the same bucket for a given service (eg. Friends and Family offers)
- vendors reselling bundles of services with a different tarification (eg. 30% on Netflix + OCS bundle)
- composite offer (eg. free dataplan for watching VOD service)
- context dependant offers (eg. free videoconference while being at a special event)
- sponsored services (eg. third party offering 20% coupons on VOD for two months)
- each client gets its personalized offer


# Requirements

## Main problematics

- build a model that can support all scenarios of an open service ecosystem
    - vendors, aggregators, marketplaces, dynamic, as-a-service, recharging...

- establish a shared trust between the 3 main actors (Service Provider, Vendor and Consumer)
    - being able to distribute (crypto) proofs _of usage, of subscription..._
    - "good enought" security model, especially on the users devices

## Use cases

Some base examples, they could be combined
- clients sharing the same bucket for a given service (eg. Friends and Family offers)
- vendors reselling bundles of services with a different tarification (eg. 30% on Netflix + OCS bundle)
- composite offer (eg. free dataplan for watching VOD service)
- context dependant offers (eg. free videoconference while being at a special event)
- sponsored services (eg. third party offering 20% coupons on VOD for two months)
- each client gets its personalized offer

## Workshop session 2022.09.16

> TODO reintegrate in requirements, translate to English

- orientation service over-IP

- decentraliser le moteur de règle

- /!\ problématique de réconciliation > Fraude
    - est-ce que ca implique forcément d'avoir un moteur centralisé ?
        - pas forcément
        - on peut faire du sampling pour "re-rater" coté serveur serveur pour vérifier qu'il n'y a pas de comportement suspect

- rendre le système robuste au fait que le service vendor ne puisse plus "voir passer les flux"

- un service provider peut lui même être un service vendor (un aggregateur...)

- appliquer le moteur d'évênement à quel evènement

- en "self-service", automatisable, sans entente prélalable humaine entre le service vendor et le service provider

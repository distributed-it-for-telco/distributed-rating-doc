# Contexte

- Dans un écosystème complexe de service et/ou dans un contexte 5G, la valorisation de l'usage des services est fortement complexifiée :
    - les fournisseurs de service ne sont plus ceux qui sont au contact du client ou ceux qui facturent le client, aggrégateurs, marketplaces...
        - les regles de tarification de l'usage des services techniques peut être différentes selon le revendeur (services composites, bundles de services, remises à l'achat, à l'usage)
    - voire une tarification "à la carte" pour chaque client (ie. un catalogue tarifaire par client)

- Plutôt que de remonter des données brutes d'usage (~CDR), valorisées dans un système central (ou semi distribué entre les différents partenaires qui contribuent au service final rendu au client) on propose de déporté la valorisation au niveau du client et de remonter au service vendor des tickets d'usage déjà valorisés
    - chacun des partenaires contribue au à la tarification spécifique du client, la tarification est faite directement en même temps que la consommation du service
    - pour faire un // avec la gestion des droits : il est plus simple d'avoir des composants qui portent chacun leur modèle d'autorisation plutôt que d'appliquer de modèle de manière externe à l'ensemble du système
    - chaque partenaite amène (sous forme d'agent) le moteur de valorisation de son service, éventuellement paramétré / surchargé par un partenaire réutlisant ce service
    - moteur de rating "as code" plutôt qu'un système fixe et paramétré

- Prerequis a ce scenario : environnement device "raisonnabiement sécurisé", possibilité de déployer du code sur cet environnement

- Orange propose un SDK à ses partenaires leur permettant d'intégrer simplement la valorisation du service dans l'application utilisée pour consommer le service
    - le SDK est un runtime wasmcloud-js qui peut faire tourner du code (1 ou des agents wasmcloud) en charge de la valorisation
    - l'application de consommation du service alimente le SDK avec des données d'usage

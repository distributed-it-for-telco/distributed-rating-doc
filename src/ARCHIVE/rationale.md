# Rationale

## Context

IPCEI CIS WP2
- Cloud Infrastructure and Services
- Work Package #2
- Orange submission: open-source and distributed Core Commerce for IT

## Value proposition

- In a complex service ecosystem and/or 5G context, the rating of service usage is highly complex:
    - service providers are no longer those who are in direct contact with the customer or those who invoice the customer, there are aggregators, marketplaces...
    - the pricing rules for the usage of technical services may be different depending on the reseller (composite services, service bundles, discounts on purchase, on usage)
    - even more: "à la carte" pricing for each customer

- Rather than uploading raw usage data (~CDR), rated in a centralized rating engine system (or semi-distributed between the various partners who contribute to the final service provided to the customer), we propose to ditribute the rating process to the customer device and upload to the service vendor of usage tickets already valued
    - each of the partners contributes to the specific pricing of the customer, the pricing is made directly at the same time as the consumption of the service
    - to do a parallel with rights management: it is easier to have components that each carry their authorization model rather than applying the model externally to the entire system
    - each partner brings (in the form of an agent) the valuation engine of his service, possibly configured / overloaded by a partner reusing this service
    - "as code" rating engine approach rather than a fixed and parameterized system

- Prerequisites for this scenario are: "reasonably secure" device environment, possibility of deploying code on this environment, ability to detect fraud

- Orange offers an SDK to its partners allowing them to simply integrate the enhancement of the service into the application used to consume the service
    - the SDK is a wasmcloud-js runtime that can run code (1 or wasmcloud agents) in charge of recovery
    - the service consumer application feeds the SDK with usage data

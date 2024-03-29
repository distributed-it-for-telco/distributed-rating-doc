# Overview of product usage rating

```admonish abstract title="Pertaining to"
- Customer account type: **ANY**
- Product offer type: **ANY**
```

```admonish example title="Vendor Use case"
**As a** Vendor providing products *over IP* through a *Teleco provider*  
**I want to** build new products based on products offered by other vendors  
**and** integrate with the rating platform of the *Teleco provider*  
**so that I can** rate the usage of products I provide  
**and** relay the rating to product dependencies vendors  
```

```admonish example title="Teleco Provider Use case"
**As a** Teleco Provider  
**I want to** provide products from multiple partners  
**and** relay the rating to partner's agent  
**so that** I can ensure all partners have rated the product before usage  
```

## Product composition

For a composed product that depend on existing products,
the rating platform needs to build product dependency model,
and map it to corresponding agents for product usage rating,
allowing each individual product vendor to rate its products

As shown in the following diagram a *Streaming* product can use
*Network*, *Storage*, and *Telemetry* products to compose its functionality,
in turn each of its product dependencies may have other dependencies.

```mermaid
{{#include product-composition.mmd}}
```

## Business processes

{{#include ./product-usage-overview.md}}

### Legend

{{#include ../legend.md}}

# Functional Specification

**TABLE OF CONTENT**
<!-- toc -->

## Introduction

The aim of this page is to describe the business aspects for the distributed charging and rating process. The specification should try to describe when possible the similarities between the distributed rating and the charging and billing components in TMF.

### Context

Distributed Rating aims to explore the use of distributed architecture for the rating and part of the charging process to optimize the utilization of the various infrastructure components. For reference the software architecture for the stream can be found [here](./architecture.md).

### Assumptions

Given the fact that this part is a research activity, this component will aim to comply with the TMF guidelines while allowing room for the needs of its innovative nature. in the first evolution the system may mock any external components to expedite the research activities.

The first evolution should focus on products provided over IP through a client application to facilitate the tracking of their usage through the client application.

## Charging & Billing

![Charging & Billing BPM](./charging_billing_overview.svg)

The process called "Billing" consists of a set of different processes, each working on one type of data:

* **Charging**
in charge of controlling the usage and decrementation of bundles. It is part of the "Factory" platform and uses the Charging rules and features described at the Product level.
* **Rating**
which valuates the usage tickets sent by the Charging. It is part of the "Offer & Products" platform and uses the tariffs and tariff plans described in the Offers to determine the tariff codes (InstalledTariff) that will be used to make the invoice.
* **Bill**
alculation, which calculates the billable items (AppliedTariff) that will be sent to billing to be put on the bill. It is part of the "Offer & Products" platform and uses the rates and tariff plan described in the Offers
* **Invoicing**
which establishes the invoice from billable items received. It is part of the "Party" platform and uses commercial catalog information to calculate invoice elements and layout.

Part of the charging and rating will be distributed in the new architecture, the rating component should then feed the generated tariff to the billing component. There's no direct impact from the invoicing component so it will not be discussed in this document's scope.

## Charging and Billing within eTOM

Below are listed level 2 business processes that are related to Product rating & Bill Calculation from within the eTOM business process framework, these processes should be used as a guide while distributing the operations on the new architecture.

### Product Usage Management

The Product Usage management processes encompass the functions required to guide, distribute, mediate, summarize, accumulate, and analyze Product Usage records. These processes may occur in real-time, near real-time (i.e. just at the end of the usage), or may be executed on a periodic basis.

Conventionally the usage is collected on the network component and forwarded to be processed in the usage management component.

In the distributed rating, the Client SDK should do the usage collection and forward it to the rating agent to be processed in real-time.

Below is the data schema of the product usage management as defined in TMF-635, the main entity used in the usage management process is the Usage and UsageSpecification

```mermaid
{{#include product_usage-class_diagram.mmd}}
```

### Product Rating & Rate Assignment

The purpose of Product Rating & Assignment is to rate a value (monetary or other) to Product Usage or a set of Product Usages and assign the result to a Product and a Billing Account. The charge may be either a credit or a debit and can be handled either online or offline.

Online charging is performed in real-time, necessitating an authorization component that can impact the delivery of the product and enables the operator to provide prepaid products to their customers. Conversely, offline charging takes place after the product has been delivered and does not necessitate real-time processing, and typically pertains to subscription-based products.

in the distributed rating, optimally the process of usage and rating should be done on the edge or the FOG levels to minimize the loud on the infrastructure.

Below is the data schema of the product usage management as defined in TMF-635, the main entity used in the product rating and rate assignment process is the RatedProductUsage entity

```mermaid
{{#include product_rating-class_diagram.mmd}}
```

### Product Balance Management

This process is responsible for holding, calculating, applying policies and managing functionality/interfaces for the Product balances, Here the values resulting from rating and the application of discounts are applied to a Product balance. The balance affected by the value may be monetary or other balances such as minutes, points, or tokens.

The rating agent should ensure that the balance is impacted and reduce it to match the product usage. The aim is to ensure that the balance is impacted instantly and is managed in a distributed manner. The operations for balance management (like top-up operations) will be out of scope of the first evolution and only the reduction of balance based on usage will be represented.

Below is the data schema of the balance as defined in TMF-654

```mermaid
{{#include product_balance-class_diagram.mmd}}
```

### Bill Calculation

Customer Bill Invoice Management processes ensure the bill invoice is created, physically and/or electronically produced and distributed to customers, and that the appropriate taxes, discounts, adjustments, rebates and credits for the products delivered to customers have been applied. These processes are accountable for assuring that enterprise revenue is billed and invoices delivered appropriately to customers.

These processes are responsible for, but not limited to:

* Establishment and application of taxes and charges to the products delivered to customers;
* Application of the adjustment (adjustment decision done in Customer Bill Inquiry Handling);
* Creation of accurate Customer bill invoices including all adjustments, rebates, discounts, credits, etc.
* Production & distribution of Customer bill in physical and/or electronic form to customers in accordance with the billing cycle;
* Forecasting of physical resources associated with Customer bill production, such as paper and envelope quantities;
* Alignment and management of promotional material insertion into distributed Customer bills
* Establishment and management of third party arrangements to support Customer bill invoice generation, production and distribution.

The implementation of the Bill Calculation component is out of scope of the distributed rating however the system should ensure that it can generate Proof of Usages and rated events that can be forwarded to the Bill calculation component - through events or shared storage - to support post paid business scenarios. The support for aggregated rating will not be addressed in the first release and can be included in later evolution due to the technical complexity associated with it.

### Managed entities

#### Customer Product Inventory

The customer product inventory component holds the information about the customer and his installed products. it's used to track all the products that the customer has subscribed to as well as their cost. in the first release the customer inventory will be a simple key-value store that holds the customer id as the key and party information with a list of their installed product in the value. the figure below show the schema of the data stored in the value.

```mermaid
{{#include customer_inventory-class_diagram.mmd}}
```

  productPrice: An amount, usually of money, that represents the actual price paid by a Customer for a purchase, a rent or a lease of a Product. The price is valid for a defined period of time.
price: A money (Money). The amount of money that characterizes the price.

Money sub-resource
A base / value business entity used to represent money.
unit: A string. Currency (ISO4217 norm uses 3 letters to define the currency).
value: A float. A positive floating point number.

```admonish summary title="Customer product inventory field descriptions" collapsible=true

RelatedParty sub-resource:
Related Entity reference. A related party defines party or party role linked to a specific entity.
- name: A string. Name of the related entity.
- id: A string. unique identifier.

productOffering A product offering reference (ProductOfferingRef). A product offering represents entities that are orderable from the provider of the catalog.
- name: A string. Name of the related entity.
- id: A string. unique identifier.
- agentId: the identifier for the agent in charge of rating this offer

productPrice: An amount, usually of money, that represents the actual price paid by a Customer for a purchase, a rent or a lease of a Product. The price is valid for a defined period of time.
- price: A money (Money). The amount of money that characterizes the price.
- priceType: A string. A category that describes the price charge, such as recurring, penalty, One time fee and so forth.
- unitOfMeasure A quantity (Quantity). A number and unit representing how many (for instance 1 dozen) of an ProductOffering is available at the offered price. Its meaning depends on the priceType. It could be a price, a rate, or a discount.

Money sub-resource:
A base / value business entity used to represent money.
- unit: A string. Currency (ISO4217 norm uses 3 letters to define the currency).
- value: A float. A positive floating point number.

```

#### Rated Usage Inventory

The rated usage inventory component holds the information about the customer's consumption and its associated cost. it's used to hold the rated usage information that can be forwarded later on to the billing component. the figure below show the schema of the rated usage.

```mermaid
{{#include rated_usage-class_diagram.mmd}}
```

```admonish summary title="Rated usage inventory field descriptions" collapsible=true

RatedUsage fields:
- id: A string. unique identifier.
- usageDate: A date time (DateTime). Date of usage.
- description:  A string. Description of usage.
- ratedProductUsage: rated product usages (RatedProductUsage). An occurrence of employing a product for its intended purpose with all rating details.
- relatedParty: related party (RelatedParty ). Related Entity reference. A related party defines party or party role linked to a specific entity.
- status: A usage status type (UsageStatusType). Possible values for the status of the Usage.
- usageCharacteristic: A list of usage characteristics (UsageCharacteristic [*]). Provides the value of a given characteristic.
- usageType: A string. Type of usage.

Money sub-resource:
A base / value business entity used to represent money.
- unit: A string. Currency (ISO4217 norm uses 3 letters to define the currency).
- value: A float. A positive floating point number.

RatedProductUsage sub-resource:
An occurrence of employing a product for its intended purpose with all rating details.
- bucketValueConvertedInAmount: A money (Money). A base / value business entity used to represent money.
- isBilled: A boolean. Boolean indicating if usage have been billed or not.
- productRef: A product reference (ProductRef).
- ratingAmountType: A string. Type of amount.
- ratingDate: A date time (DateTime). Date of usage rating.
- usageRatingTag A string. Tag value: [usage]: the usage is always rated outside a usage bundle [included usage]: the usage is rated inside a usage bundle, [non included usage]: the usage bundle is exhausted. The usage is rated outside the usage bundle.

RelatedParty sub-resource:
Related Entity reference. A related party defines party or party role linked to a specific entity.
- name A string. Name of the related entity.
- id A string. unique identifier.
- role A string. Role played by the related party.

UsageCharacteristic sub-resource:
Provides the value of a given characteristic.
- id: A string. Unique identifier of the characteristic.
- name: A string. Name of the characteristic.
- valueType: A string. Data type of the value of the characteristic.

```

### System Personas

#### Customer

The end user that is benefiting from the product irrespective of his relation with different entities involved.

```admonish example title="Customer Example"
- Person requesting to watch a movie on a streaming provider through his teleco account.
- Person requesting to consume a hosting products from a cloud provider which relies on a teleco products for connectivity
```

#### Vendor

The entity that's managing the customer account. a vendor can be reselling a product, building a composite product or providing his own products as well.

Depending on the usecase the same entity can be regarded as vendor, provider or a partner.

#### Provider

The entity providing their products for partners with a revenue sharing model. providers can also be represented as the Vendor in case of selling directly yo the Customer.

#### Partner

Describes the relation between Vendors and providers, providers are considered a partner for the vendor that's reselling/composing their products. Providers are also considered partners to other providers if the use other products.

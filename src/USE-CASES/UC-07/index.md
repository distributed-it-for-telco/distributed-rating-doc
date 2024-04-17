# Overview of MetaVerse distributed rating

```admonish abstract title="Pertaining to"
- Customer account type: **B2B**
- Product offer type: **Bundle**
```

```admonish example title="Enter Room Use case"
**As a** *Teleco provider*  providing ads *over the MetaVerse*  
**I want to** avail virtual rooms where people can watch ads and movies
**so that I can** control the number of avatars entering a virtual room
And offer ads services to advertisers
```

```admonish example title="Watch Ad Use case"
**As a** Teleco Provider  
**I want to** offer advertisement as a service through viewing it to the avatars in a virtual room
**and** rate the views of ads  
**so that** I can charge the advertisers for the viewed ads and leverage the benefits from the MetaVerse
```

## Product composition

In this use case, we are managing one offer with two related products. The first product is the virtual room and the second product is the advertisement viewed in these rooms.

Unlike other use cases, the products are provided by the teleco provider.
The customer of the teleco provider is the advertising company. while the user of the service is the avatar entering the room and watching the advertisement.
Each virtual room has a capacity for the number of avatars that can enter the room. Once the quota is reached the room is closed. The advertiser should be able to avail a room again by recharging his balance for the virtual room.
Balance recharge is out of scope for this release.

Once avatar enters the room, they can watch an advertisement, these views are then charged to the advertisers account.

```mermaid
{{#include ./product-composition.mmd}}
```

## Business processes
there's no change in the business process for rating as the rating logic is the same
{{#include ./rating-bpm.svg}}

### Legend

{{#include ../legend.md}}

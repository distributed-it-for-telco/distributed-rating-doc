# UC-06: CQRS - Usage Proof command

In the context of the *distributed rating* system, *event sourcing* plays a
vital role in ensuring a reliable and accurate log of product usage events.
This log serves as a foundation for auditing, monitoring, and enhancing
the performance, scalability, and responsiveness of the system.

While the *edge layer* handles the collection, storage, and computation of
necessary information for the *rating* procedure, it is essential to maintain
records of product usage throughout the entire system to ensure its consistency
and precision.

The *central cloud* takes responsibility for storing the records propagated by
edge devices and performing data consolidation over multiple sources.
Thus eliminating the need for synchronizing the data model and the
business domain, while also enabling future compensating actions.

## Business processes

{{#include ../UC-02/product-usage-overview.md}}

### Usage Proof command propagation

> The *Usage proof* is the command that outlines a product usage event.

![Diagram depicting the Usage Proof propagation process](./rating-bpm.svg)

### Legend

{{#include ../legend.md}}

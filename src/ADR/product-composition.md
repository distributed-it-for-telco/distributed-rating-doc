# Product composition and dependency traversal

* Status: accepted
* Deciders:
* Date: YYYY.MM.DD

Technical Story: [UC-02: Rate usage - Overview](/USE-CASES/UC-02/index.md)

## Context and Problem Statement

A product can be composed of other products from same or different vendors,
the rating platform needs to model the dependency relationship and the traversal technique,
to grantee deterministic and reliable rating procedure.

## Decision Drivers

* Distributed
* Scalable

## Considered Options

* Queue datastructure with FIFO traversal
* Stack datastructure with LIFO traversal
* Tree datastructure with DFS traversal
* Tree datastructure with BFS traversal

## Decision Outcome

### Positive Consequences

### Negative Consequences

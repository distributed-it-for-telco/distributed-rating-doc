### Product usage overview

The process of product usage in the *distributed rating* system, which is
illustrated in the model below, begins with the client request going through
the *Rating Coordinator* and each *Rating Agent* before finally issuing
the *Usage Proof*, which is collected and stored by the *Usage Collector*,
focusing on the crucial role of the *Rating Coordinator* in decoupling
the *Rating Agent* and standardizing the communication between them.

Also, the process model illustrates the iterative approach used by
the *Usage Collector* to carry out its main three tasks:

1. Construct the agent dependency graph, by recursively quering each agent for its dependencies.
2. Validate the usage request by all the agents.
3. Trigger rating for each agent in order of their dependencies.

![Diagram depicting the product usage process](/USE-CASES/UC-02/rating-bpm.svg)

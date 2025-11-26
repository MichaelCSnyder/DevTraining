# Developer Training Module

## Welcome to SMART-Bank!
### The (simplified) Online Banking App

This project is a simple banking application meant to provide exposure to event sourcing. Event sourcing is a pattern where we store all changes to application state as a sequence of events. 

- Events represent facts that have occurred in the domain
- The current state is derived by replaying these events
- Events are immutable and represent the history of the domain

This pattern is central to many of our workflow implementations, providing both an audit trail and a mechanism for state reconstruction.
---
### Your Task

The account creation flow is already complete. You will be expected to add the following functionality:

1. Allow users to deposit money to their account
2. Allow users to withdraw money from their account

Orient youself with the initial implementation and follow the existing patterns to flesh out the above functionality.

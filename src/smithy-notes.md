# Smithy Notes

This document to give you some notes about smithy with wasmcloud and Rust.

# Table of contents
1. [Introduction](#introduction)
2. [Important links](#links)
3. [Annotation traits](#annotation)
    1. [codegen](#codegen)


## Introduction <a name="introduction"></a>
Every capability provider has a capability contract - an interface definition - that defines a service and a set of operations it supports. Even actor-to-actor messages, which don't use capability contracts, benefit by well-defined API contracts. In wasmCloud, we define these API contracts in Smithy files.


## Important links <a name="links"></a>

[Interfaces](#https://wasmcloud.com/docs/hosts/abis/wasmbus/interfaces/)

## Annotation traits <a name="annotation"></a>
### codegen <a name="codegen"></a>
  when can we use this traits will be mentioned in this [link](#https://wasmcloud.com/docs/hosts/abis/wasmbus/interfaces/traits#codegenrust)
  but the only note you need to know is :
  - you should add the import for codegenrust in your smithy file to see the effect of using this trait 

  > use org.wasmcloud.model#codegenRust

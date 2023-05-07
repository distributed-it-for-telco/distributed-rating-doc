# Runbook : Manage ks store
### Product name : 
- Disco-rating

### Product version :
-  All

### Runbook Goals :
- How to manage kv store using cli 
### Preconditions
- [Cosmonic cli](https://cosmonic.com/docs/user_guide/cosmo_cli) installed
- [wash](https://wasmcloud.com/docs/installation?os=mac) installed
- [NATS cli](https://docs.nats.io/using-nats/nats-tools/nats_cli) installed
### Stages :
1. [Stage 1](#stage1) : List kv buckets
2. [Stage 2](#stage2) : List all keys in a bucket
3. [Stage 3](#stage3) : Put key and value
4. [Stage 4](#stage4) : Get value using key



***
***


## Stage 1 : List kv buckets <a name="stage1"></a>

open your terminal and execute the below command

> nats kv -s connect.cosmonic.sh --creds ~/.cosmo/user.creds ls


This command will retun the buckets in kv store


## Stage 2 : List all keys in a bucket <a name="stage2"></a>

open your terminal and execute the below command

>  nats kv -s connect.cosmonic.sh --creds ~/.cosmo/user.creds ls ***bucket-id***


***bucket-id*** : is the id of bucket returned from Stage 1 


## Stage 3 : put key and value <a name="stage3"></a>

open your terminal and execute the below command

>  nats kv -s connect.cosmonic.sh --creds ~/.cosmo/user.creds put 125b2a01-09a1-4d64-8bfc-5aa222e9c560 ***key*** ***value***

> ex nats kv -s connect.cosmonic.sh --creds ~/.cosmo/user.creds put 125b2a01-09a1-4d64-8bfc-5aa222e9c560 customer1 '{\n        "product": {\n           "id":1234,\n           "offerId":534,\n           "description":"”Video on Demand”",\n           "productPrice": {\n              "description":"”Cost per movie”",\n              "validTill":"1/March/2024",\n              "priceType":"non-recurring",\n              "unitOfMeasure": {\n                 "amount":"1",\n                 "units":"”movie”"\n              },\n              "price": {\n                 "unit":"eur",\n                 "value":"1"\n              },\n              "ratingAgent": {}\n           }\n        }\n    }'

## Stage 4 : Get value using key <a name="stage4"></a>
open your terminal and execute the below command

> nats kv -s connect.cosmonic.sh --creds ~/.cosmo/user.creds get ***bucket-id***  ***key*** --raw

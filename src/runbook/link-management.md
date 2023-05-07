# Runbook : Link management
### Product name : 
- Disco-rating

### Product version :
-  All

### Runbook Goals :
- How to manage links throw wash cli
### Preconditions
- [Cosmonic cli](https://cosmonic.com/docs/user_guide/cosmo_cli) installed
- [wash](https://wasmcloud.com/docs/installation?os=mac) installed
### Stages :
1. [Stage 1](#stage1) : Query Links
2. [Stage 2](#stage2) : Delete Link
3. [Stage 3](#stage3) : Create Link



***
***


## Stage 1 : Query Links <a name="stage1"></a>

open your terminal and execute the below command

> wash ctl link query -x 125b2a01-09a1-4d64-8bfc-5aa222e9c560 --ctl-port 4222 --ctl-host connect.cosmonic.sh --ctl-credsfile ~/.cosmo/user.creds


This command will retun the id of the Links


## Stage 2 : Delete Link <a name="stage2"></a>

open your terminal and execute the below command

>  wash ctl link del ***<link_id>*** wasmcloud:keyvalue -x 125b2a01-09a1-4d64-8bfc-5aa222e9c560 --ctl-port 4222 --ctl-host connect.cosmonic.sh --ctl-credsfile ~/.cosmo/user.creds

***link_id*** : is the id returned from Stage 1 


## Stage 3 : Create Link <a name="stage3"></a>

open your terminal and execute the below command

>  wash ctl link put --link-name ***<LINK_NAME>*** [OPTIONS] ***<actor-id>*** ***<provider-id>*** ***<contract-id>***

***LINK_NAME*** : the name of the link you need to create
***actor-id*** : the id of the actor which will use this link
***provider-id*** : the id of the provider which the actor will link to
***contract-id*** : the contract id of this provider

> ex :  wash ctl link put -x 125b2a01-09a1-4d64-8bfc-5aa222e9c560 --ctl-port 4222 --ctl-host connect.cosmonic.sh --ctl-credsfile ~/.cosmo/user.creds --link-name local-redis-to-vod-bucket MCS4KQH3XXYN2CA7TIY4OAWE4Q3J6AZSPWX6BK5EOF7MH2FE76NSGYIF VAKKKUUZH6FWYPS3T6WVAESSPVQMQYJ2IRCXGSHYCOISSIUGCXVJYC6M linkwasmcloud:keyvalue
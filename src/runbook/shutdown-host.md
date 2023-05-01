# Runbook : Shutdown a host
### Product name : Disco-rating

### Product version : *

### Runbook Goals :
- Shudown a host in a local machine 
### Preconditions
- [Cosmonic cli](https://cosmonic.com/docs/user_guide/cosmo_cli) installed
- [wash](https://wasmcloud.com/docs/installation?os=mac) installed
### Stages :
1. Stage 1 : Get yout local host id
2. Stage 2 : Stop the host



***
***





## Stage 1 : Get your local host id

> wash ctl get hosts -x 125b2a01-09a1-4d64-8bfc-5aa222e9c560 --ctl-port 4222 --ctl-host connect.cosmonic.sh --ctl-credsfile ~/.cosmo/user.creds





## Stage 2 : Stop the host

> wash ctl stop host ***<host_id>*** -x 125b2a01-09a1-4d64-8bfc-5aa222e9c560 --ctl-port 4222 --ctl-host connect.cosmonic.sh --ctl-credsfile ~/.cosmo/user.creds

# goalman
Goals management

## SERVICE RUNNING PORTS:
- Server  : Running in 4000 
- Client  : Running in 3000 (enabled proxy to access endpoint with port 4000 using setupProxy)
- JSON    : Running in 5000 (Mock DB)

## TODOs:
Need to replace Json-server with real Mongo DB.

```
STEPS TO START THE APP:
    - clone the app
    - npm install
    - npm run dev
```

## JSON SERVER USAGE
    https://www.npmjs.com/package/json-server

## CHANGE LOGS:
3. API Names Working InProgress:
    - User Profile details:
        Endpoint - /api/user
        Url for json-server: http://localhost:5000/user/101
    
    - Objectives group-by user:
        Endpoint - /api/objectives 
        Url for json-server: http://localhost:5000/user/101?_embed=objectives
    
    - Manager Dashboard ( TBD )
        Endpoint - /api/usersList
        Url for json-server: http://localhost:5000/user?reportingMgrId=103 

2. Initial Setup
    - file structure
    - server (initial setup, enable proxy, a sample endpoint)
    - client(base CRA)
    - jsonDB(with json-server) setups.

1. Initial Commit

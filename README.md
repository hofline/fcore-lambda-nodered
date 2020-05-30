# fcore-lambda-nodered #

Serverless Node-RED base project with AWS Lambda and Express for IoT and more. Low-code programming for event-driven applications

- [Flow Based Programming](https://en.wikipedia.org/wiki/Flow-based_programming)
- [Node-RED](https://nodered.org/)

### Gettting started
```
npm install
```

### local run
```
export DEVELOPMENT=1 && node app.js
```

### Navigate to Node-Red Console
```
http://localhost:1880/red
```

### Serverless deployment ###
```
sls deploy --stage dev --region us-west-2 --bucket my-sls-deployments-us-west-2 --aws-profile profile-dev
```

### More nodes for AWS [https://www.npmjs.com/package/node-red-contrib-aws](https://www.npmjs.com/package/node-red-contrib-aws)
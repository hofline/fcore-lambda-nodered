const http = require('http');
const express = require("express");
const RED = require("node-red");
const serverless = require("serverless-http");

isserverless = process.env.DEVELOPMENT == 0;

var app = express();

var settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/api",
    userDir: "./nodered/",
    flowFile: "flows.json",
    functionGlobalContext: {}
};

if (isserverless) {
    console.log('Copy configurations...');
    var fs = require('fs-extra');
    fs.copySync('./nodered', '/tmp/nodered');
    settings.userDir = "/tmp/nodered/";
}

if (!isserverless) {
    var server = http.createServer(app);
    RED.init(server, settings);
    app.use(settings.httpAdminRoot, RED.httpAdmin);
    app.use(settings.httpNodeRoot, RED.httpNode);
    server.listen(1880);
    RED.start();
}

if (isserverless) {
    
    settings.httpRoot = false;
    settings.httpAdminRoot = false;

    let init = (() => {
        RED.init(settings);
        app.use(settings.httpNodeRoot, RED.httpNode);
        return new Promise((resolve, reject) => {
            let deployed;
            RED.events.on("runtime-event", deployed = function (data) {
                if (data.id === "runtime-deploy") {
                    RED.events.removeListener("runtime-event", deployed);
                    resolve();
                }
            });
            RED.start();
        })
    })()

    function setup() {
        return init.then(() => {
            return new Promise((resolve, reject) => {
                RED.nodes.loadFlows().then(() => { resolve() });
            });
        });
    };

    const handler = serverless(app);
    
    module.exports.handler = async (event, context, callback) => {
        var r = await setup().then(async () => {
            let result = await handler(event, context);
            return result;
        });
        context.done(null, r);
    };
}
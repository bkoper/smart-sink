# Smart Sink
Smart Sink is a platform for Artik, that lets you control your water usage by giving light notification whenever you cross usage limits. User can monitor whether you exceed daily or current water usage. It is entirely made in JavaScript, it uses React, Flux, Node.js and express. 

# Instalation

## Hardware
In terms of low level communication please refer to other my projects:
- [artik-io](https://github.com/bkoper/artik-io) - core library for communication with GPIO,
- [artik-io-devices](https://github.com/bkoper/artik-io-devices) - abstractions for handling devices such as LED and WaterFlow sensors.

**connecting leds**
- all configuration related to PIN connection: ```backend/controller/led_controller```
- by default leds are connected to bridge J26 in order [(check ARtik10 mapping)](https://developer.artik.io/documentation/developer-guide/gpio-mapping.html):
    -- pin 2 - green led
    -- pin 3 - yellow led
    -- pin 4 - red led

It is recommended to connect LEDs through channel relay module (5V), [like this one](https://developer.artik.io/documentation/developer-guide/gpio-mapping.html),
all connections remains the same.

**water flow sensors**
- for the purpose of this project I use model: YF-S201
- all configuration related to PIN connection: ```backend/controller/status_controller```
- by default signal cabel of cold sensor is connected to pin nb 8 of bridge J26, and hot sensor is connected to pin nb 9 of the same bridge
- both sensors need to be power by 5V inputs as well

## Building project

**requirements installation**
```bash
$ npm i -g gulp // if you haven't done it before
$ npm i
```

**edit configs**
- set IP and host at: ```./frontend/js/constsants/config.js```
- example
```javascript
export default {
    SERVER_IP: "0.0.0.0",
    SERVER_PORT: "8081",
    DOMAIN: "artik.local",
...
```

**build front side**
```bash
$ gulp build
```

**build server side**
```bash
$ gulp build --server
```

**start the application**
```
$ node ./build/server.entry.js
```
your application will be accessible: ```https://domain:port/```

**start the application in demo mode**
```
$ __demo=true node ./build/server.entry.js
```

# Project structure

- ```backend``` folder contains source files for server side
- ```frontend``` - source of website
- ```./frontend/js/constsants/config.js``` - IP and domain configuration (for both front and backend side)
- ```frontend/main.js``` entry point to the application
- ```components/app.js``` route component
- store manages state of the application (same rule for both server and frontend side)
- ```backend/server.js``` - start point for server side
- ```backend/lib/artik-suite``` - low level communication with GPIO
- ```backend/lib/fakeSensors.js``` - sensor data simulation, for testing or demo purpose
- ```backend/model/api.js``` - source file for ```/rest/*``` request communication

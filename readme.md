***
Project is archived and no longer supported.
===
***

# <a href="http://devpost.com/software/smart-sink-uwh1g4"><img src='http://i.imgur.com/f7DA08T.png' height='60'></a>

Smart Sink is a platform for Artik, that lets you control your water usage by giving light notification whenever you cross usage limits. User can monitor whether you exceed daily or current water usage. It is entirely made in JavaScript, it uses React, Flux, Node.js and express. 

### Overview design
![Overview design](https://github.com/bkoper/smart-sink/blob/master/docs/min-overview-design.jpg?raw=true)

# Instalation

## Hardware

**connecting leds**
- all configuration related to PIN connection: ```server-side/controller/led_controller```
- by default leds are connected to bridge J26 in order [(check ARtik10 mapping)](https://developer.artik.io/documentation/developer-guide/gpio-mapping.html):
    -- pin 2 - green led
    -- pin 3 - yellow led
    -- pin 4 - red led

It is recommended to connect LEDs through channel relay module (5V), [like this one](https://developer.artik.io/documentation/developer-guide/gpio-mapping.html),
all connections remains the same.

**water flow sensors**
- for the purpose of this project I use model: YF-S201
- all configuration related to PIN connection: ```server-side/controller/status_controller```
- by default signal cabel of cold sensor is connected to pin nb 8 of bridge J26, and hot sensor is connected to pin nb 9 of the same bridge
- both sensors need to be power by 5V inputs as well

### Board connections
![Board connections](https://github.com/bkoper/smart-sink/blob/master/docs/min-board-connections.jpg?raw=true)

## Building project

**requirements installation**
```bash
$ yarn
```

**edit config file**
- based on ```./config/sample_config.js``` create your own file and place it at: ```./config/config.js```,
- set your server desire IP - it will be used for websocket connection (*most probably default settings will be ok*),
- set local domain name for artik server (remember to put a record in your ```hosts``` file),
- create an application in [artik.cloud portal](https://developer.artik.cloud/),
    - update ```CLIENT_ID``` and ```CLIENT_SECRET``` values in config file,
    - set proper redirection url in your artik cloud app configuration, it should be fullfill the pattern ```http://DOMAIN/auth/callback```

**build front side**
```bash
$ yarn build:ui
```

**build server side**
```bash
$ yarn build:server
```

**build all modules**
```bash
$ yarn build
```


**build all modules in production version (no logs, no warnings, minimized libs)**
```bash
$ yarn prod
```

**start the application**
```
$ yarn start
```
your application will be accessible: ```http://domain:port/```

**start the application in demo mode**
```
$ yarn demo
```

**start debug mode**
```
$ yarn debug
```

# Project structure

In terms of low level communication please refer to other my projects:
- [artik-io](https://github.com/bkoper/artik-io) - core library for communication with GPIO,
- [artik-io-devices](https://github.com/bkoper/artik-io-devices) - abstractions for handling devices such as LED and WaterFlow sensors.

Selected project directories:
- ```server-side``` folder contains source files for server side
- ```ui``` - source of website
- ```./ui/js/constsants/config.js``` - IP and domain configuration (for both front and server side)
- ```ui/main.js``` entry point to the application
- ```components/app.js``` route component
- store manages state of the application (same rule for both server and ui side)
- ```server-side/server.js``` - start point for server side
- ```server-side/lib/artik-suite``` - low level communication with GPIO
- ```server-side/lib/fakeSensors.js``` - sensor data simulation, for testing or demo purpose
- ```server-side/model/api.js``` - source file for ```/rest/*``` request communication

## Diagrams

### Server components
![Server components](https://github.com/bkoper/smart-sink/blob/master/docs/min-server-components.jpg?raw=true)

### Website components
![Website components](https://github.com/bkoper/smart-sink/blob/master/docs/min-website-components.jpg?raw=true)

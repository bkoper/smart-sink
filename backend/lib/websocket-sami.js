import WebSocket from 'ws';
const webSocketURL = "wss://api.samsungsami.io/v1.1/websocket?ack=true";

const coldDeviceToken = "156a0b9af21b46669f44e2653b24f9bf";
const coldDeviceId = "52bee04947e24a5da1dfa6b811949695";
const hotDeviceToken = "29209169552c4d3697d64e0b686e7a28";
const hotDeviceId = "8cab91bd1a584793b35996a611485928";

const __debug = false;

class Sami {
    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.isWebSocketReady = false;
        this.ws = null;
    }

    connect() {
        this.ws = new WebSocket(webSocketURL);

        this.ws.on('open', () => {
            __debug && console.log("Websocket connection is open ....");
            this.register(this.id, this.token);
        });

        this.ws.on('message', (data, flags) => {
            __debug && console.log(`Received message: ${data}, flags: ${flags}`);
        });

        this.ws.on('close', () => {
            __debug && console.log("Websocket connection is closed ....");
        });
    }

    register() {
        __debug && console.log("Registering device on the websocket connection");
        try {
            let registerMessage = {
                sdid: this.id,
                type: "register",
                Authorization: `bearer ${this.token}`
            };
            __debug && console.log(`Sending register message ${registerMessage}`);
            this.ws.send(JSON.stringify(registerMessage), {mask: true});
            this.isWebSocketReady = true;
        }
        catch (e) {
            console.error('Failed to register messages. Error in registering message: ' + e.toString());
        }
    }

    sendData(avg, total) {
        if (!this.isWebSocketReady) {
            return;
        }

        try {
            let payload = {
                sdid: this.id,
                ts: new Date().valueOf(),
                type: 'message',
                data: {
                    total: total,
                    avg: avg
                }
            };

            this.ws.send(JSON.stringify(payload), {mask: true});
        } catch (e) {
            console.error('Error in sending a message: ' + e.toString());
        }
    }
}

let coldSami = new Sami(coldDeviceId, coldDeviceToken);
let hotSami = new Sami(hotDeviceId, hotDeviceToken);

coldSami.connect();
hotSami.connect();

export {coldSami, hotSami};
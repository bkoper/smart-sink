import authCloud from './auth-cloud';
import WebSocket from 'ws';
import config from '../../config/config';
const __debug = process.env.__debug;

class Sami {
    constructor(id) {
        this.id = id;
        this.isWebSocketReady = false;
        this.ws = null;
    }

    connect() {
        this.ws = new WebSocket(config.CLOUD_SOCKET_URL);

        this.ws.on('open', () => {
            __debug && console.log("Websocket connection is open ....");
            this.register(this.id);
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
                Authorization: `bearer ${authCloud.token}`
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

let coldSami = new Sami(config.COLD_WATER_SDID, config.COLD_WATER_DEVICE_TOKEN);
let hotSami = new Sami(config.HOT_WATER_SDID, config.HOT_WATER_DEVICE_TOKEN);

coldSami.connect();
hotSami.connect();

export {coldSami, hotSami};

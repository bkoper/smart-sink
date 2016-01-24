import socket from 'socket.io';
import constants from '../../frontend/js/constants/general';
import webConfig from '../../frontend/js/constants/config';

let io;
let clients = [];

export default {
    init(server) {
        io = socket(server);
        io.on(webConfig.EVENT_CONNECTION, client => {
            console.log("client connected");
            clients.push(client);
        })
    },

    emit(event, data) {
        for(let key in clients) {
            clients[key].emit(event, data);
        }
    }
}
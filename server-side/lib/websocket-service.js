import socket from 'socket.io';
import webConfig from '../../config/config';
import clientsStore from '../model/clients';

let io;
let clients = [];

export default {
    init(server) {
        io = socket(server);
        io.on(webConfig.EVENT_CONNECTION, client => {
            console.info("client connected");
            clients.push(client);

            clientsStore.addClient(client);
        })
    },

    emit(event, data) {
        for(let key in clients) {
            this.emitToOne(clients[key], event, data);
        }
    },

    emitToOne(client, event, data) {
        client.emit(event, data);
    }
}
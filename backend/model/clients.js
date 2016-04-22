import {EventEmitter} from 'events';
import webConfig from '../../config/config';

class ClientsStore extends EventEmitter {
    constructor() {
        super();
        this.clients = new WeakSet();
    }

    addClient(client) {
        this.clients.add(client);
        this.emit(webConfig.EVENT_CONNECTION, client);
    }

    removeClient(client){
        if(this.clients.has(client)) {
            this.clients.delete(client);
            this.emit(webConfig.EVENT_DISCONNECT);
        }
    }
}


let clientsStore = new ClientsStore();

export default clientsStore;
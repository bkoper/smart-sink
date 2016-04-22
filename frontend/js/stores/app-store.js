import {dispatch, register} from '../dispatchers/app-dispatcher';
import Constants from '../../../config/events';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

export default class SenesorStore extends EventEmitter {
    constructor(dispatcherUpdateEvent, initialState) {
        super();
        this.dispatcherUpdateEvent = dispatcherUpdateEvent;

        this.state = initialState;

        this.init(dispatcherUpdateEvent);
    }

    emitChange(){
        this.emit( CHANGE_EVENT )
    }

    addChangeListener( callback ){
        this.on( CHANGE_EVENT, callback )
    }

    removeChangeListener( callback ){
        this.removeListener( CHANGE_EVENT, callback )
    }

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    init(dispatcherEvent) {

        this.dispatcherIndex = register( function( action ){
            switch(action.actionType){
                case dispatcherEvent:
                    this.setState( action.item );
                    break;
            }

            this.emitChange();

        }.bind(this))
    }
}
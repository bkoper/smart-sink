import {dispatch, register} from '../dispatchers/app-dispatcher';
import Constants from '../../../config/events';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let activePage = 0;

const GeneralStore = Object.assign({}, EventEmitter.prototype, {
    emitChange(){
        this.emit( CHANGE_EVENT )
    },

    addChangeListener( callback ){
        this.on( CHANGE_EVENT, callback )
    },

    removeChangeListener( callback ){
        this.removeListener( CHANGE_EVENT, callback )
    },

    changePage(newActivePage) {
        activePage = newActivePage;
    },

    getActivePage() {
        return activePage;
    },

    dispatcherIndex: register( function( action ){
        switch(action.actionType){
            case Constants.CHANGE_PAGE_EVENT:
                GeneralStore.changePage( action.item );
                break;
        }

        GeneralStore.emitChange();

    })
});

export default GeneralStore;
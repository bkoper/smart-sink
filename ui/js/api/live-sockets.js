import io from 'socket.io-client';
import {hotSensorActions, coldSensorActions, generalActions, coldAlertActions, hotAlertActions, coldLimitsActions, hotLimitsActions} from '../actions/app-actions';
import config from '../../../config/config';
import constants from '../../../config/events';


const socket = io.connect(`http://${config.SERVER_IP}:${config.SERVER_PORT}`);

socket.on(constants.HOT_SENSOR_UPDATE, data => hotSensorActions.update(data));
socket.on(constants.COLD_SENSOR_UPDATE, data => coldSensorActions.update(data));
socket.on(constants.HOT_ALERTS_UPDATE, data => hotAlertActions.update(data));
socket.on(constants.COLD_ALERTS_UPDATE, data => coldAlertActions.update(data));

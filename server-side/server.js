import http from 'http';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import express from 'express';
import statusContoller from './controller/status-controller';
import connectionController from './controller/connection-controller';
import ledController from './controller/led-controller';
import alertController from './controller/alert-controller';
import restRoutes from './routes/';
import {SERVER_IP, SERVER_PORT} from '../config/config';

const app = express();
const server = http.createServer(app);
const PUBLIC_DIR = './build/'; //path.join(__dirname, '..', 'build');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/rest', restRoutes);
app.use(express.static(PUBLIC_DIR));

connectionController.init(server);
statusContoller.init();
alertController.init();
!process.env.__demo && ledController.init();

server.listen(SERVER_PORT, SERVER_IP, () => console.info(`server runing at ${SERVER_IP}:${SERVER_PORT}`));

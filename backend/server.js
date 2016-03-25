import http from 'http';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import express from 'express';
import statusContoller from './controller/status_controller';
import connectionController from './controller/connection_controller';
import ledController from './controller/led_controller';
import alertController from './controller/alert_controller';
import api from './model/api';
import webConfig from '../frontend/js/constants/config';

// import routes       from './routes/index';
// import users        from './routes/users';

const host = webConfig.SERVER_IP;
const port = webConfig.SERVER_PORT;
const app = express();
const server = http.createServer(app);
const PUBLIC_DIR = './build/'; //path.join(__dirname, '..', 'build');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/rest', api);

app.use(express.static(PUBLIC_DIR));

connectionController.init(server);
statusContoller.init();
alertController.init();
ledController.init();

server.listen(port, host, () => console.log(`server runing at ${host}:${port}`));

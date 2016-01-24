import http from "http";
import path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import express from "express";
import statusContoller from "./controller/status_controller";

// import routes       from './routes/index';
// import users        from './routes/users';

const host = '127.0.0.1';
const port = 8081;
const app = express();
const server = http.createServer(app);
const PUBLIC_DIR = "./build/"; //path.join(__dirname, "..", "build");

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/', routes);
// app.use('/users', users);

app.use(express.static(PUBLIC_DIR));

statusContoller.init(server);

server.listen(port, host, () => console.log(`server runing at ${host}:${port}`));

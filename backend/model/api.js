import express from 'express';
import settings from './settings-store';
import units from '../helpers/unit';
import {dailyRequest, monthlyRequest, monthlyStatistics} from '../lib/request-sami';
import auth from '../lib/auth';

const router = express.Router();
const demoData = {
    dailyStatus: [{"data":[0,0,0,0,0,0,0,10,1,1.45,2.2,3,3,4,4,4,8,8,8,10,11,11,11,12.4]}, {"data":[0,0,0,0,0,0,0,10,1,1.45,2.2,3,3,4,4,4,8,8,8,10,10,10,10,11.4]}],
    monthlyStatus: [{"data":[0,0,35,65,65,65,65,65,167,212,58,58,149,87,100,109,6,7,18,12,56,0,0,0,0,0,0,0,0,0,0]},{"data":[0,0,32,65,65,65,65,65,168,210,59,59,148,90,67,112,6,7,37,12,55,0,0,0,0,0,0,0,0,0,0]}],
    stats: [[{"data":{"sdid":"8cab91bd1a584793b35996a611485928","startDate":"1456786800000","endDate":"1459461540000","field":"total","interval":"month","size":1,"data":[{"count":277,"min":0,"max":28,"mean":9.433213,"sum":2613,"variance":54.144455,"ts":1454284800000}]}},{"data":{"sdid":"52bee04947e24a5da1dfa6b811949695","startDate":"1456786800000","endDate":"1459461540000","field":"total","interval":"month","size":1,"data":[{"count":277,"min":0,"max":28,"mean":9.133574,"sum":2529.9998,"variance":55.14823,"ts":1454284800000}]}}],[{"data":{"sdid":"8cab91bd1a584793b35996a611485928","startDate":"1456786800000","endDate":"1459461540000","field":"avg","interval":"month","size":1,"data":[{"count":277,"min":0,"max":3,"mean":0.80144405,"sum":222,"variance":0.9244744,"ts":1454284800000}]}},{"data":{"sdid":"52bee04947e24a5da1dfa6b811949695","startDate":"1456786800000","endDate":"1459461540000","field":"avg","interval":"month","size":1,"data":[{"count":277,"min":0,"max":4,"mean":0.8231047,"sum":228,"variance":1.199755,"ts":1454284800000}]}}]]
};
const handleArtikCloudRequest = (demoField, request) => (req, res) => {
    return process.env.__demo ? res.json(demoField) : request(req.session.token)
        .then(data => res.json(data))
        .catch(err => res.status(err.statusCode).end());
};

router.route("/")
    .get((req, res) => {
       res.sendStatus(200);
    });

router.route("/dailyStatus").all(handleArtikCloudRequest(demoData.dailyStatus, dailyRequest));

router.route("/monthlyStatus").all(handleArtikCloudRequest(demoData.monthlyStatus, monthlyRequest));

router.route("/stats").all(handleArtikCloudRequest(demoData.stats, monthlyStatistics));

router.route("/settings")
    .get((req, res) => {
        let limits = settings.getState();

        res.json(Object.assign({}, limits, {
            streamLimit: units.c(limits.streamLimit),
            dailyUsage: units.c(limits.dailyUsage)
        }));
    })
    .post((req, res) => {
        let body = req.body;
        settings.setState(body);
        res.status(201).json(body);
    });

router.use('/auth', auth);

export default router;

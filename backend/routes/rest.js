import express from 'express';
import settings from './../model/settings-store';
import units from '../helpers/unit';
import {dailyRequest, monthlyRequest, monthlyStatistics} from '../lib/request-cloud';
import auth from './auth';
import demoData from '../../config/demoData';

const router = express.Router();
const handleArtikCloudRequest = (demoField, request) => (req, res) => {
    return process.env.__demo ? res.json(demoField) : request()
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

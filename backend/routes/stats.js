import express from 'express';
import {dailyRequest, monthlyRequest, monthlyStatistics} from '../lib/request-cloud';
import demoData from '../../config/demoData';

const router = express.Router();
const handleArtikCloudRequest = (demoField, request) => (req, res) => {
    return process.env.__demo ? res.json(demoField) : request()
        .then(data => res.json(data))
        .catch(err => res.status(err.statusCode).end());
};

router.route("/dailyStatus").all(handleArtikCloudRequest(demoData.dailyStatus, dailyRequest));
router.route("/monthlyStatus").all(handleArtikCloudRequest(demoData.monthlyStatus, monthlyRequest));
router.route("/stats").all(handleArtikCloudRequest(demoData.stats, monthlyStatistics));

export default router;

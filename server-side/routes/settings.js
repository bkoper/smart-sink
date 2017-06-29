import express from 'express';
import settings from './../model/settings-store';
import units from '../helpers/unit';

const router = express.Router();

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

export default router;

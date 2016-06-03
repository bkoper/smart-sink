import express from 'express';
import calculateSavings from '../model/save-money-store';
import settingsStore from '../model/settings-store';
import {defaults} from "lodash";

const router = express.Router();
let possibleValues = new Set();

possibleValues
    .add(10)
    .add(15)
    .add(20)
    .add(25)
    .add(30);

router.route("/saveMoney/:savingAmount")
    .get((req, res) => {
        if (possibleValues.has(+req.params.savingAmount)) {
            calculateSavings(+req.params.savingAmount)
                .then( data => res.json(defaults(data, settingsStore.getState())))
                .catch(err => res.status(err.statusCode).end());
        } else {
            res.status(404).end()
        }
    });

export default router;

import express from 'express';

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
            res.json({
                "streamLimit": "2.00",
                "streamOpenTime": "4",
                "streamLimitCrossed": "8",
                "dailyUsage": "23.00",
                "units": "gallons"
            });
        } else {
            res.status(404).end()
        }
    });

export default router;

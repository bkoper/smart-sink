/*
 The MIT License (MIT)

 Copyright (c) 2016 Bartlomiej Koper <bkoper@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

let ARTIK_10 = {
	J24: {
		"A0": 0,
		"A1": 1,
		"A2": 2,
		"A3": 5,
		"A4": 6,
		"A5": 7
	},

    J26: {
        "Rx-0": null,
        "Tx-0": null,
        "2": 8,
        "3": 9,
        "4": 10,
        "5": 0,
        "6": 1,
        "7": 11
    },

	J27: {
        "8": 12,
        "9": 13,
        "10": 14,
        "11": 16,
        "12": 21,
        "13": 22,
        "GND": "GND"
    }
};

let ARTIK_5 = {
	J24: {
		"A0": 0,
		"A1": 1,
	},

    J26: {
        "Rx-0": "Rx",
        "Tx-1": "Tx",
        "2": 121,
        "3": 122,
        "4": 123,
        "5": 0,
        "6": 1,
        "7": 124
    },

    J27: {
        "8": 125,
        "9": 126,
        "10": 127,
        "11": 129,
        "12": 134,
        "13": 135,
        "GND": "GND"
    }
}

export default {
    pins: {
        ARTIK_5: Object.assign({}, ARTIK_5, {
            //Pins 0, 1, 2, 5, 6, 7 can be used as Analog Inputs.
			"analog0": ARTIK_10.J24["A0"],
			"analog1": ARTIK_10.J24["A1"],

            //Pins 2-4 and 7-13 are GPIO and can be used as digital input or output
            "rx": ARTIK_5.J26["Rx-0"],
            "tx": ARTIK_5.J26["Tx-0"],
            "2": ARTIK_5.J26[2],
            "3": ARTIK_5.J26[3],
            "4": ARTIK_5.J26[4],
            "5": ARTIK_5.J26[5],
            "6": ARTIK_5.J26[6],
            "7": ARTIK_5.J26[7],

            "8": ARTIK_5.J27[8],
            "9": ARTIK_5.J27[9],
            "10": ARTIK_5.J27[10],
            "11": ARTIK_5.J27[11],
            "12": ARTIK_5.J27[12],
            "13": ARTIK_5.J27[13],
            "gnd": ARTIK_5.J27["GND"],

            "pwm0": ARTIK_5.J26[5],
            "pwm1": ARTIK_5.J26[6]
        }),

        ARTIK_10: Object.assign({}, ARTIK_10, {
            //Pins 0, 1, 2, 5, 6, 7 can be used as Analog Inputs.
			"analog0": ARTIK_10.J24["A0"],
			"analog1": ARTIK_10.J24["A1"],
			"analog2": ARTIK_10.J24["A2"],
			"analog3": ARTIK_10.J24["A3"],
			"analog4": ARTIK_10.J24["A4"],
			"analog5": ARTIK_10.J24["A5"],

            //Pins 2-4 and 7-13 are GPIO and can be used as digital input or output
            "rx": ARTIK_10.J26["Rx-0"],
            "tx": ARTIK_10.J26["Tx-0"],
            "2": ARTIK_10.J26[2],
            "3": ARTIK_10.J26[3],
            "4": ARTIK_10.J26[4],
            "5": ARTIK_10.J26[5],
            "6": ARTIK_10.J26[6],
            "7": ARTIK_10.J26[7],

            "8": ARTIK_10.J27[8],
            "9": ARTIK_10.J27[9],
            "10": ARTIK_10.J27[10],
            "11": ARTIK_10.J27[11],
            "12": ARTIK_10.J27[12],
            "13": ARTIK_10.J27[13],
            "gnd": ARTIK_10.J27["GND"],

            "pwm0": ARTIK_10.J26[5],
            "pwm1": ARTIK_10.J26[6]
        })
    }
};
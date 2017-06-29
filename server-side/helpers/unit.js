import settings from '../model/settings-store';

const l2gal = 0.264172052;
const gal2L = 3.78541178;
const l2cubicFeer = 0.0353146667;

export default {
    c(value) {
        return settings.getState().units === 'litres' ? value : parseFloat(value * l2gal).toFixed(2)
    },

    cubicFeet(value) {
        return settings.getState().units === 'litres' ? value : parseFloat(value * l2cubicFeer).toFixed(2)
    },

    toLitres(value) {
        return parseFloat(value * gal2L).toFixed(2);
    }
};
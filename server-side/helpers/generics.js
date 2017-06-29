const random100 = (max = 100) => Math.floor(Math.random() * max) + 1;
const randomBool = () => !!Math.floor(Math.random() * 2);

export default {random100, randomBool};
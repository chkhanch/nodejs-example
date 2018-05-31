module.exports = (space = ':', time = new Date(), ...params) => {

    const correctNumber = number => number < 10 ? '0' + number : number;

    fixedTime = params ? params.map(param => correctNumber(time[param]())) : null;

    const hours = correctNumber(time.getHours());
    const minuts = correctNumber(time.getMinutes());
    const seconds = correctNumber(time.getSeconds());

    return hours + space + minuts + space + seconds;
};
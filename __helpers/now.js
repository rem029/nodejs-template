const msToMinutesAndHour = (ms) => {
  let hours = Math.floor(ms / 60 / 60000);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let seconds = Math.floor((ms / 1000) % 60);

  hours = hours >= 10 ? hours : '0' + hours;
  minutes = minutes >= 10 ? minutes : '0' + minutes;
  seconds = seconds >= 10 ? seconds : '0' + seconds;

  return `${hours} hours(s) ${minutes} minute(s) ${seconds} seconds(s)`;
};

module.exports = {
  get: () => {
    return new Date().toLocaleString('en-QA', Intl.DateTimeFormat().resolvedOptions().timeZone);
  },
  elapsedTime: (startDateTimeString, endDateTimeString) => {
    let start = new Date(startDateTimeString);
    let end = new Date(endDateTimeString);
    return msToMinutesAndHour(end - start);
  },
};

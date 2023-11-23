export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const difference = now.getTime() - new Date(date).getTime();

  const seconds = 1000;
  const minutes = 60 * seconds;
  const hours = 60 * minutes;
  const days = 24 * hours;
  const weeks = 7 * days;
  const months = 30 * days;
  const years = 360 * days;

  if (difference < seconds) {
    return "hace menos de un minuto";
  } else if (difference < minutes) {
    const secondsElapsed = Math.floor(difference / seconds);
    return `hace ${secondsElapsed} ${
      secondsElapsed === 1 ? "segondo" : "segundos"
    }`;
  } else if (difference < hours) {
    const minutesElapsed = Math.floor(difference / minutes);
    return `hace ${minutesElapsed} ${
      minutesElapsed === 1 ? "minuto" : "minutos"
    }`;
  } else if (difference < days) {
    const hoursElapsed = Math.floor(difference / hours);
    return `hace ${hoursElapsed} ${hoursElapsed === 1 ? "hora" : "horas"}`;
  } else if (difference < weeks) {
    const daysElapsed = Math.floor(difference / days);
    return `hace ${daysElapsed} ${daysElapsed === 1 ? "día" : "días"}`;
  } else if (difference < months) {
    const weeksElapsed = Math.floor(difference / weeks);
    return `hace ${weeksElapsed} ${weeksElapsed === 1 ? "semana" : "semanas"}`;
  } else if (difference < years) {
    const monthsElapsed = Math.floor(difference / months);
    return `hace ${monthsElapsed} ${monthsElapsed === 1 ? "mes" : "meses"}`;
  }

  const yearsElapsed = Math.floor(difference / years);
  return `hace ${yearsElapsed} ${yearsElapsed === 1 ? "año" : "años"}`;
};

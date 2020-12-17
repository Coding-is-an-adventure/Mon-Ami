export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = date.getFullYear();
  // starts at 0.
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const datestring = `${year}-${month}-${day}`;
  return new Date(datestring + " " + timeString);
};

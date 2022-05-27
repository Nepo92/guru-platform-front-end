class DateUtils {
  formatDDMMYYYY(timestump: number) {
    let day: number | string = new Date(timestump).getDate();
    let month: number | string = new Date(timestump).getMonth() + 1;
    let year = new Date(timestump).getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }

  toTimestamp(string: string) {
    const arr = string.split("-");

    const year = +arr[2];
    const month = +arr[1] - 1;
    const day = +arr[0];

    return +new Date(year, month, day);
  }

  dateToServer(string: string) {
    const arr = string.split(".");

    return `${arr[0]}-${arr[1]}-${arr[2]}`;
  }
}

export default DateUtils;

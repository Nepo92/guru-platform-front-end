class DateUtils {
  formatDDMMYYYY(timestump) {
    let day = new Date(timestump).getDate();
    let month = new Date(timestump).getMonth() + 1;
    let year = new Date(timestump).getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }

  toDateParse(string) {
    const arr = string.split("-");

    return `${arr[1]}.${arr[0]}.${arr[2]}`;
  }

  dateToServer(string) {
    const arr = string.split(".");

    return `${arr[0]}-${arr[1]}-${arr[2]}`;
  }
}

export default DateUtils;

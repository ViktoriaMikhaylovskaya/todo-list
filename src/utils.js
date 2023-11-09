export const  sortByDeadlineDate = (a, b) => {
  var dateA = new Date(a.deadlineDate);
  var dateB = new Date(b.deadlineDate);

  return dateA - dateB;
}

export const sortByCreationDate = (a, b) => {
  var dateA = new Date(a.createdDate);
  var dateB = new Date(b.createdDate);

  return dateA - dateB;
}

export const getActualDate = () => {
    const date = new Date();

    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date.getFullYear() % 100;
    if (year < 10) year = '0' + year;

    return `20${year}-${month}-${day}`
};

export const getActualDateWithTime = () => {
    const date = getActualDate();

    let hours = new Date().getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = new Date().getMinutes() + 1;
    if (minutes < 10) minutes = '0' + minutes;

    return `${date}, ${hours}:${minutes}`
};

export const reverseDate = (date) => date.split('-').reverse().join('-');

export const reverseDateWithTime = (date) => {
    let newDate = date.split(',');

    return newDate[0].split('-').reverse().join('-') + newDate[1];
};

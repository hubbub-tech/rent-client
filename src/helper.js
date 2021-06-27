import moment from 'moment';

const printMoney = (floatAmount) => {
  const errorMsg = "printMoney can only be used on type float."
  console.assert(typeof floatAmount === "float", {floatAmount, errorMsg});
  const money = Number.parseFloat(floatAmount).toFixed(2);
  return `${money}`;
}

const stringToMoment = (stringDate, formatStr = "YYYY-MM-DD") => {
  const momentDate = moment.utc(stringDate, formatStr);
  return momentDate;
}

const printMoment = (momentDate, formatStr = "MMMM Do YYYY") => {
  const printDate = momentDate.format(formatStr);
  return printDate;
}

export { stringToMoment, printMoment, printMoney };

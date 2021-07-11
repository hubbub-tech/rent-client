import moment from 'moment';

const printMoney = (floatAmount) => {
  const errorMsg = "printMoney can only be used on type float."
  //console.assert(typeof floatAmount === "float", {floatAmount, errorMsg});
  const money = Number.parseFloat(floatAmount).toFixed(2);
  return `$${money}`;
}

const stringToMoment = (stringDate, formatStr = "YYYY-MM-DD") => {
  const momentDate = moment.utc(stringDate, formatStr);
  return momentDate;
}

const printDate = (stringDate, formatStr = "MMMM Do YYYY") => {
  // stringDate is a 'YYYY-MM-DD format'
  const momentDate = stringToMoment(stringDate);
  const printDate = momentDate.format(formatStr);
  return printDate;
}

const expDecay = (retailPrice, timeNow, discount = .50, timeTotal = 28) => {
  // Where discount is issued at timeTotal
  let basePrice = retailPrice / 10;
  if (timeNow > 180) {
    timeTotal = 56;
  }
  let compound = retailPrice / 90;
  let a = compound * Math.pow(10, - Math.log((1 - discount), 10) / (timeTotal - 1));
  let r = 1 - (compound / a);
  let y = a * Math.pow(1 - r, timeNow);

  //calculate the cost of the rental to the user
  let integTime = y / Math.log(1 - r);
  let integ0 = a * (1 - r) / Math.log(1 - r);
  let costToDate = basePrice + integTime - integ0;
  if (costToDate < basePrice) {
    return basePrice;
  }
  return costToDate;
}

export { stringToMoment, printDate, printMoney, expDecay };

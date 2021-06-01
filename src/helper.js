const formatName = (unformattedName) => {
  let _formattedName = unformattedName.split(",")
  let formattedName = _formattedName.join(" ")
  return formattedName;
};

// Eventually build in messages
const isActiveRental = (startDate, endDate) => {
  const todayDate = new Date();
  if (startDate < todayDate && endDate > todayDate) {
    return True;
  } else if (startDate > todayDate) {
    return False;
  } else {
    return False;
  }
}

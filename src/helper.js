const formatName = (unformattedName) => {
  let _formattedName = unformattedName.split(",")
  let formattedName = _formattedName.join(" ")
  return formattedName;
};

const strToDate = (dateStr) => new Date(dateStr);

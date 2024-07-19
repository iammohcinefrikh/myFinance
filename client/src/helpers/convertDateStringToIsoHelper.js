const convertDateStringToIso = (dateString) => {
  const parts = dateString.split('/');
  const day = String(parts[0]).padStart(2, '0');
  const month = String(parts[1]).padStart(2, '0');
  const year = parts[2];
  const formattedDateString = `${year}-${month}-${day}T00:00:00.000Z`;
  return new Date(formattedDateString).toISOString();
};

export default convertDateStringToIso;
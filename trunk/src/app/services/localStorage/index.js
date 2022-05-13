export const getStorageСurrency = () =>
  JSON.parse(localStorage.getItem("active_currency"));

export const setStorageСurrency = (currency) =>
  localStorage.setItem("active_currency", JSON.stringify(currency));

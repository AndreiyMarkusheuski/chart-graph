import { ACTIVE_CURRENCY } from "../../consts";

export const getStorageСurrency = () =>
  JSON.parse(localStorage.getItem(ACTIVE_CURRENCY));

export const setStorageСurrency = (currency) =>
  localStorage.setItem(ACTIVE_CURRENCY, JSON.stringify(currency));

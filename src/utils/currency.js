export const formatCurrency = (amount, settings) => {
  if (settings.currency === "KHR") {
    return (amount * settings.exchangeRate).toLocaleString();
  }

  return amount.toFixed(2);
};

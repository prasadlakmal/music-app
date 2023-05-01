const isNewSearchQuery = (currentValue: string, newValue: string) => {
  return !new RegExp(`^${currentValue}`).test(newValue);
};

export default isNewSearchQuery;

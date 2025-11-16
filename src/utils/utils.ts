function createFilterString(object: Record<string, any>) {
  const cleanFilters = Object.fromEntries(
    Object.entries(object).filter(([, v]) => v !== undefined && v !== null)
  );
  return new URLSearchParams(cleanFilters).toString();
}

export { createFilterString };

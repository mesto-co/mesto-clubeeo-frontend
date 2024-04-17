export const routeParamToString = (param: string | string[]): string => {
  if (Array.isArray(param)) return param[0] || ''; //take first if multiple
  return param || '';
};

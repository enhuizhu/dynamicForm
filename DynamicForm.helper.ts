/* eslint-disable @typescript-eslint/no-explicit-any */
export const shouldShowField = (formData: Record<string, any>, dependencies: Record<string, any>): boolean => {
  let shouldShow = true;

  const dependenciesKeys = Object.keys(dependencies);
  dependenciesKeys.forEach(key => {
    let condition = formData?.[key] === dependencies[key];
    
    if (Array.isArray(dependencies[key])) {
      
      if (!Array.isArray(formData?.[key])) {
        condition = dependencies[key].includes(formData?.[key]);
      } else {
        const valueInform = formData?.[key]?.join(',');
        const valueInConfig = dependencies[key]?.join(',');
        condition = valueInform === valueInConfig;
      }
    }

    shouldShow = shouldShow && condition;
  });

  return shouldShow;
}

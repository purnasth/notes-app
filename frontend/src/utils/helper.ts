export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const getInitials = (name: string): string => {
  if (name === null || name === undefined) return '';

  // const nameArray = name.split(' ');
  const nameArray = name.split(/[\s_]+/);
  let initials = '';

  for (let i = 0; i < Math.min(nameArray.length, 2); i++) {
    initials += nameArray[i][0];
  }

  return initials.toUpperCase();
};

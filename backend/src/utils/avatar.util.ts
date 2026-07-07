export const generateDefaultAvatar = (
  firstName: string,
  lastName: string = ''
): string => {
  const nameQuery = `${firstName.trim()} ${lastName.trim()}`.trim();

  const encodedName = encodeURIComponent(nameQuery);

  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=200`;
};

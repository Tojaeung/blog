export const removeHtmlTag = (content: string) => {
  const reg = /<[^>]*>?/g;
  return content.replace(reg, '');
};

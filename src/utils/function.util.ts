export const replaceRouteParams = (
  url: string,
  params: Record<string, string | number>
): string => {
  let replacedUrl = url;
  Object.entries(params).forEach(([key, value]) => {
    replacedUrl = replacedUrl.replace(`:${key}`, value.toString());
  });
  return replacedUrl;
};

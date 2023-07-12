export const getSubdomain = (url = "") => {
  return url.split(".")[0].split("://")[1];
};

const getSubdomain = (url = "") => {
  return url.split(".")[0].split("://")[1];
};

export const getEnvVars = (url = "") => {
  let subdomain = getSubdomain(url);

  // if client-side, get the subdomain from the current URL
  if (typeof window !== "undefined") {
    subdomain = getSubdomain(window.location.href);
  }

  switch (subdomain) {
    case "qw": {
      return {
        API_URL: process.env.API_URL_QW,
      };
    }

    case "iq": {
      return {
        API_URL: process.env.API_URL_IQ,
      };
    }

    default: {
      throw new Error(`Unknown subdomain: ${subdomain}`);
    }
  }
};

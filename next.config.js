/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["qw", "iq"], // your subdomains
    defaultLocale: "qw",
    domains: [
      {
        domain: "qw.infodimes.com",
        defaultLocale: "qw",
      },
      {
        domain: "iq.infodimes.com",
        defaultLocale: "iq",
      },
      // more domains...
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = function (api) {
  return {
    plugins: ["macros"],
  };
};

module.exports = nextConfig;

module.exports = {
  "fontawesome-svg-core": {
    license: "free",
  },
};

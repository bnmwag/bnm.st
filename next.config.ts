const withVercelToolbar = require("@vercel/toolbar/plugins/next")();
const { withPayload } = require("@payloadcms/next/withPayload");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withVercelToolbar(withPayload(nextConfig));

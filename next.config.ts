import { withPayload } from "@payloadcms/next/withPayload";
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig = {};

export default withPayload(withVercelToolbar(nextConfig));

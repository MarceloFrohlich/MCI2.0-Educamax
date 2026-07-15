import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //build autocontido para rodar em container (coolify/docker)
  output: "standalone",
};

export default nextConfig;

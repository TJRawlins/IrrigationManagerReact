import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env.VITE_TREFLE_API_KEY;
  process.env.VITE_API_PORT;
  process.env.VITE_PORT;
  return defineConfig({
    server: {
      https: {
        key: "./ssl/localhost.key",
        cert: "./ssl/localhost.crt",
      },
      port: parseInt(process.env.VITE_PORT)
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
  });
};

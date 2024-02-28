import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./ssl/localhost.key",
      cert: "./ssl/localhost.crt",
    },
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
});

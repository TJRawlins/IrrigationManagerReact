import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      https: {
        key: "./ssl/localhost.key",
        cert: "./ssl/localhost.crt",
      },
      port: parseInt(process.env.VITE_REACT_DEV_PORT || "3000"),
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor libraries
            vendor: ["react", "react-dom", "react-router-dom"],
            mui: [
              "@mui/material",
              "@mui/icons-material",
              "@mui/x-data-grid",
              "@mui/x-charts",
            ],
            utils: ["axios", "formik", "yup", "@reduxjs/toolkit"],
            icons: ["react-icons"],
            // Remove firebase from manual chunks as it causes issues
          },
        },
      },
      // Increase chunk size warning limit if you're comfortable with current sizes
      chunkSizeWarningLimit: 1000, // Increase from default 500kB to 1000kB
    },
  });
};

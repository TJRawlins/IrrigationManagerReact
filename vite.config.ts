import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    https: {
      key: './ssl/localhost.key',
      cert: './ssl/localhost.crt'

    },
    port: 3000
  },
  plugins: [react()],
})
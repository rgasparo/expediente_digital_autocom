import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/

// Remote App
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "expediente",
      filename: "remoteEntry.js",
      exposes: {
        "./DocumentsModal": "./src/components/Modal/ModalWrapper",
        './DocumentsProvider': './src/context/DocumentsProvider',
        './useDocuments': './src/hooks/useDocuments',
        './images': './src/assets/images',
      },
      shared: [
        "react", 
        "react-dom", 
        "react-axios", 
        "react-router-dom",
        "react-html5-camera-photo",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

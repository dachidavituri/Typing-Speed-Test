import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  const componentsPath = `${srcPath}/components`;
  const pagesPath = `${srcPath}/pages`;
  const assetPath = `${srcPath}/assets`;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "&": componentsPath,
        "#": pagesPath,
        "!": assetPath,
      },
    },
  };
});

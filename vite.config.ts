import {defineConfig} from "vite";
import viteReact from "@vitejs/plugin-react";

import {TanStackRouterVite} from "@tanstack/router-plugin/vite";
import {resolve} from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 8001,
        allowedHosts: ["tf-api-dev.roto.lol"]
    },
    plugins: [TanStackRouterVite({autoCodeSplitting: true}), viteReact()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    }
});

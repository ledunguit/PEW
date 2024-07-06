import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel(["resources/ts/app.tsx"]),
    ],

    resolve: {
        "alias": {
            "@": __dirname + "/resources/ts"
        }
    },
    build: {
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return
                }
                warn(warning)
            }
        }
    }
});

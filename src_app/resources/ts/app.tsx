import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import MainLayout from "./layouts/main";
import { App as AntdApp } from "antd";

type Page = {
    default: {
        layout?: (page: React.ReactNode) => React.ReactNode;
    };
};

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx");

        const importPage = pages[`./pages/${name}.tsx`] as () => Promise<Page>;
        let page: Page = await importPage();

        page.default.layout =
            page.default.layout || ((page) => <MainLayout>{page}</MainLayout>);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <AntdApp
                message={{
                    maxCount: 2,
                }}
            >
                <App {...props} />
            </AntdApp>
        );
    },
});

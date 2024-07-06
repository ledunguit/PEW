import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import MainLayout from "./layouts/main";

type Page = {
    default: {
        layout: (page: React.ReactNode) => React.ReactNode;
    };
};

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
        let page: Page = pages[`./pages/${name}.tsx`] as Page;

        page.default.layout =
            page.default.layout || ((page) => <MainLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

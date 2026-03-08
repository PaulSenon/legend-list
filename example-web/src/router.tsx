import React from "react";

import { createRootRoute, createRoute, createRouter, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import "./router.css";

import AccurateScrollToExample from "./examples/AccurateScrollToExample";
import AccurateScrollToHugeExample from "./examples/AccurateScrollToHugeExample";
import AddToEndExample from "./examples/AddToEndExample";
import AlwaysRenderExample from "./examples/AlwaysRenderExample";
import BidirectionalInfiniteListExample from "./examples/BidirectionalInfiniteListExample";
import ChatExample from "./examples/ChatExample";
import ColumnsExample from "./examples/ColumnsExample";
import CountriesExample from "./examples/CountriesExample";
import CountriesWithHeadersStickyExample from "./examples/CountriesWithHeadersStickyExample";
import ExtraDataExample from "./examples/ExtraDataExample";
import FixedSizeItemsExample from "./examples/FixedSizeItemsExample";
import InitialScrollIndexExample from "./examples/InitialScrollIndexExample";
import LazyListExample from "./examples/LazyListExample";
import MutableCellsExample from "./examples/MutableCellsExample";
import MVCPTestExample from "./examples/MVCPTestExample";
import PrependLargeItemsJumpExample from "./examples/PrependLargeItemsJumpExample";
import VirtualListComparison from "./examples/VirtualListComparison";
import WindowScrollExample from "./examples/WindowScrollExample";

export type ExampleRoute = {
    path: string;
    title: string;
    element: () => React.ReactNode;
    usesWindowScroll?: boolean;
};

export const EXAMPLES: ExampleRoute[] = [
    {
        element: () => <BidirectionalInfiniteListExample />,
        path: "bidirectional-infinite-list",
        title: "Bidirectional Infinite List",
    },
    { element: () => <CountriesExample />, path: "countries", title: "Countries List" },
    {
        element: () => <CountriesWithHeadersStickyExample />,
        path: "countries-with-headers-sticky",
        title: "Countries with headers sticky",
    },
    { element: () => <FixedSizeItemsExample />, path: "fixed-size-items", title: "Fixed size items" },
    { element: () => <LazyListExample />, path: "lazy-list", title: "Lazy List" },
    { element: () => <AlwaysRenderExample />, path: "always-render", title: "Always render" },
    { element: () => <MVCPTestExample />, path: "mvcp-test", title: "MVCP test" },
    { element: () => <ColumnsExample />, path: "columns", title: "Columns" },
    { element: () => <InitialScrollIndexExample />, path: "initial-scroll-index", title: "Initial scroll index" },
    { element: () => <AccurateScrollToExample />, path: "accurate-scrollto", title: "Accurate scrollTo" },
    { element: () => <AddToEndExample />, path: "add-to-end", title: "Add to the end" },
    { element: () => <ChatExample />, path: "chat-example", title: "Chat Example" },
    { element: () => <MutableCellsExample />, path: "mutable-cells", title: "Mutable cells" },
    { element: () => <ExtraDataExample />, path: "extra-data", title: "Extra data" },
    {
        element: () => <PrependLargeItemsJumpExample />,
        path: "prepend-large-items-jump",
        title: "Prepend large items jump",
    },
    { element: () => <WindowScrollExample />, path: "window-scroll", title: "Window scroll", usesWindowScroll: true },
    { element: () => <AccurateScrollToHugeExample />, path: "accurate-scrollto-huge", title: "Accurate scrollTo huge" },
    { element: () => <VirtualListComparison />, path: "virtual-list-comparison", title: "Virtual List Comparison" },
];

function SidebarLayout() {
    const router = useRouter();
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const activeExample = EXAMPLES.find((example) => `/${example.path}` === pathname);
    const isWindowScrollExample = !!activeExample?.usesWindowScroll;
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className={isSidebarOpen ? "sidebar-layout sidebar-layout--open" : "sidebar-layout"}>
            <button
                className="sidebar-layout__toggle"
                onClick={() => setIsSidebarOpen((value) => !value)}
                type="button"
            >
                Menu
            </button>
            {isSidebarOpen ? (
                <button
                    aria-label="Close navigation menu"
                    className="sidebar-layout__overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    type="button"
                />
            ) : null}
            <aside className="sidebar-layout__aside">
                <h1 style={{ marginBottom: 12, marginTop: 0 }}>Legend List Web Example</h1>
                <h2 style={{ marginTop: 0 }}>Legend List Web Examples</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {EXAMPLES.map((ex) => {
                        const href = `/${ex.path}`;
                        const isActive = pathname === href;
                        return (
                            <a
                                href={href}
                                key={ex.path}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.navigate({ to: href as any });
                                    setIsSidebarOpen(false);
                                }}
                                style={{
                                    background: isActive ? "#eef6ff" : "#fff",
                                    border: isActive ? "1px solid #8ab4f8" : "1px solid #ddd",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    padding: "8px 10px",
                                    textDecoration: "none",
                                }}
                            >
                                {ex.title}
                            </a>
                        );
                    })}
                </div>
            </aside>
            <div
                className={
                    isWindowScrollExample
                        ? "sidebar-layout__content sidebar-layout__content--window"
                        : "sidebar-layout__content sidebar-layout__content--fixed"
                }
            >
                <Outlet />
            </div>
        </div>
    );
}

const rootRoute = createRootRoute({
    component: SidebarLayout,
});

const routes = EXAMPLES.map((ex) =>
    createRoute({
        component: () => (
            <div
                style={
                    ex.usesWindowScroll
                        ? { display: "flex", flexDirection: "column" }
                        : { display: "flex", flex: 1, flexDirection: "column", minHeight: 0 }
                }
            >
                <h3 style={{ margin: 0 }}>{ex.title}</h3>
                <div
                    style={
                        ex.usesWindowScroll
                            ? { display: "flex", flexDirection: "column" }
                            : { display: "flex", flex: 1, minHeight: 0 }
                    }
                >
                    {ex.element()}
                </div>
            </div>
        ),
        getParentRoute: () => rootRoute,
        path: ex.path,
    }),
);

function IndexRedirect() {
    const router = useRouter();
    React.useEffect(() => {
        router.navigate({ to: `/${EXAMPLES[0].path}` as any });
    }, [router]);
    return null;
}

const indexRoute = createRoute({
    component: IndexRedirect,
    getParentRoute: () => rootRoute,
    path: "/",
});

const routeTree = rootRoute.addChildren([...routes, indexRoute]);

export const router = createRouter({
    routeTree,
});

// Register the Router instance type for TS auto types
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

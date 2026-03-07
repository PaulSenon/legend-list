import React from "react";

import { createRootRoute, createRoute, createRouter, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
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
import { type ExampleScrollMode, ExampleScrollModeProvider, isWindowScrollMode } from "./examples/scrollMode";
import VirtualListComparison from "./examples/VirtualListComparison";
import WindowScrollExample from "./examples/WindowScrollExample";

const SCROLL_MODES = ["container", "window"] as const satisfies readonly ExampleScrollMode[];

type ExampleRoute = {
    component: React.ComponentType;
    path: string;
    supportedScrollModes: readonly ExampleScrollMode[];
    title: string;
};

const BOTH_SCROLL_MODES = [...SCROLL_MODES] as const;
const CONTAINER_ONLY = ["container"] as const satisfies readonly ExampleScrollMode[];
const WINDOW_ONLY = ["window"] as const satisfies readonly ExampleScrollMode[];

export const EXAMPLES: ExampleRoute[] = [
    {
        component: BidirectionalInfiniteListExample,
        path: "bidirectional-infinite-list",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Bidirectional Infinite List",
    },
    {
        component: CountriesExample,
        path: "countries",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Countries List",
    },
    {
        component: CountriesWithHeadersStickyExample,
        path: "countries-with-headers-sticky",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Countries with headers sticky",
    },
    {
        component: FixedSizeItemsExample,
        path: "fixed-size-items",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Fixed size items",
    },
    { component: LazyListExample, path: "lazy-list", supportedScrollModes: BOTH_SCROLL_MODES, title: "Lazy List" },
    {
        component: AlwaysRenderExample,
        path: "always-render",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Always render",
    },
    { component: MVCPTestExample, path: "mvcp-test", supportedScrollModes: CONTAINER_ONLY, title: "MVCP test" },
    { component: ColumnsExample, path: "columns", supportedScrollModes: BOTH_SCROLL_MODES, title: "Columns" },
    {
        component: InitialScrollIndexExample,
        path: "initial-scroll-index",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Initial scroll index",
    },
    {
        component: AccurateScrollToExample,
        path: "accurate-scrollto",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Accurate scrollTo",
    },
    {
        component: AddToEndExample,
        path: "add-to-end",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Add to the end",
    },
    { component: ChatExample, path: "chat-example", supportedScrollModes: BOTH_SCROLL_MODES, title: "Chat Example" },
    {
        component: MutableCellsExample,
        path: "mutable-cells",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Mutable cells",
    },
    { component: ExtraDataExample, path: "extra-data", supportedScrollModes: BOTH_SCROLL_MODES, title: "Extra data" },
    {
        component: PrependLargeItemsJumpExample,
        path: "prepend-large-items-jump",
        supportedScrollModes: CONTAINER_ONLY,
        title: "Prepend large items jump",
    },
    {
        component: WindowScrollExample,
        path: "window-scroll",
        supportedScrollModes: WINDOW_ONLY,
        title: "Window scroll",
    },
    {
        component: AccurateScrollToHugeExample,
        path: "accurate-scrollto-huge",
        supportedScrollModes: BOTH_SCROLL_MODES,
        title: "Accurate scrollTo huge",
    },
    {
        component: VirtualListComparison,
        path: "virtual-list-comparison",
        supportedScrollModes: CONTAINER_ONLY,
        title: "Virtual List Comparison",
    },
];

function parseRequestedScrollMode(search: Record<string, unknown>): ExampleScrollMode {
    return search.scroll === "window" ? "window" : "container";
}

function resolveEffectiveScrollMode(
    requestedMode: ExampleScrollMode,
    supportedScrollModes: readonly ExampleScrollMode[],
): ExampleScrollMode {
    if (supportedScrollModes.includes(requestedMode)) {
        return requestedMode;
    }

    return supportedScrollModes[0] ?? "container";
}

function getSupportedModeLabel(supportedScrollModes: readonly ExampleScrollMode[]) {
    if (supportedScrollModes.length === 2) {
        return "Both modes";
    }

    return supportedScrollModes[0] === "window" ? "Window only" : "Container only";
}

function getModeIndicatorLabel(requestedMode: ExampleScrollMode, effectiveMode: ExampleScrollMode) {
    const activeLabel = isWindowScrollMode(effectiveMode) ? "Window" : "Container";
    if (effectiveMode === requestedMode) {
        return activeLabel;
    }

    return `${activeLabel} only`;
}

function ExampleRouteFrame({ example }: { example: ExampleRoute }) {
    const requestedMode = useRouterState({
        select: (state) => parseRequestedScrollMode((state.location.search ?? {}) as Record<string, unknown>),
    });
    const effectiveMode = resolveEffectiveScrollMode(requestedMode, example.supportedScrollModes);
    const isFallback = effectiveMode !== requestedMode;
    const ExampleComponent = example.component;

    return (
        <ExampleScrollModeProvider
            value={{
                effectiveMode,
                isFallback,
                requestedMode,
                supportedModes: example.supportedScrollModes,
            }}
        >
            <div
                style={
                    isWindowScrollMode(effectiveMode)
                        ? { display: "flex", flexDirection: "column", gap: 12 }
                        : { display: "flex", flex: 1, flexDirection: "column", gap: 12, minHeight: 0 }
                }
            >
                <h3 style={{ margin: 0 }}>{example.title}</h3>
                <div
                    style={
                        isWindowScrollMode(effectiveMode)
                            ? { display: "flex", flexDirection: "column" }
                            : { display: "flex", flex: 1, minHeight: 0 }
                    }
                >
                    <ExampleComponent />
                </div>
            </div>
        </ExampleScrollModeProvider>
    );
}

function SidebarLayout() {
    const router = useRouter();
    const pathname = useRouterState({ select: (state) => state.location.pathname });
    const requestedMode = useRouterState({
        select: (state) => parseRequestedScrollMode((state.location.search ?? {}) as Record<string, unknown>),
    });
    const SIDEBAR_WIDTH = 260;
    const CONTENT_OFFSET = SIDEBAR_WIDTH + 28;
    const MOBILE_BREAKPOINT = 900;
    const activeExample = EXAMPLES.find((example) => `/${example.path}` === pathname) ?? EXAMPLES[0];
    const effectiveMode = resolveEffectiveScrollMode(requestedMode, activeExample.supportedScrollModes);
    const [windowWidth, setWindowWidth] = React.useState(() => window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(() => window.innerWidth > MOBILE_BREAKPOINT);
    const isMobile = windowWidth <= MOBILE_BREAKPOINT;

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        setIsSidebarOpen(!isMobile);
    }, [isMobile]);

    React.useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile, pathname]);

    const getModeHref = React.useCallback((mode: ExampleScrollMode) => `${pathname}?scroll=${mode}`, [pathname]);

    const layoutPadding = isMobile ? 0 : 16;
    const contentTopPadding = isMobile ? 76 : 16;
    const modeIndicatorLabel = getModeIndicatorLabel(requestedMode, effectiveMode);
    const hasModeChoice = activeExample.supportedScrollModes.length > 1;
    const floatingTop = 16;
    const floatingRight = 16;

    return (
        <div
            style={{
                minHeight: "100svh",
                position: "relative",
            }}
        >
            {isMobile ? (
                <>
                    <button
                        onClick={() => setIsSidebarOpen((value) => !value)}
                        style={{
                            alignItems: "center",
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: 999,
                            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
                            cursor: "pointer",
                            display: "inline-flex",
                            fontSize: 14,
                            fontWeight: 600,
                            gap: 8,
                            left: 16,
                            padding: "10px 14px",
                            position: "fixed",
                            top: 16,
                            zIndex: 30,
                        }}
                        type="button"
                    >
                        <span style={{ fontSize: 16, lineHeight: 1 }}>{isSidebarOpen ? "x" : "="}</span>
                        Examples
                    </button>
                    {isSidebarOpen ? (
                        <button
                            aria-label="Close navigation menu"
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                background: "rgba(15, 23, 42, 0.34)",
                                border: 0,
                                cursor: "pointer",
                                inset: 0,
                                position: "fixed",
                                zIndex: 10,
                            }}
                            type="button"
                        />
                    ) : null}
                </>
            ) : null}
            <div
                style={{
                    alignItems: "center",
                    backdropFilter: "blur(10px)",
                    background: "rgba(255, 255, 255, 0.94)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: 999,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.14)",
                    display: "flex",
                    gap: 8,
                    maxWidth: isMobile ? "calc(100vw - 104px)" : "none",
                    padding: isMobile ? "6px 8px" : "7px 9px",
                    position: "fixed",
                    right: floatingRight,
                    top: floatingTop,
                    zIndex: 4000,
                }}
            >
                <span
                    style={{
                        color: effectiveMode === requestedMode ? "#475569" : "#9a3412",
                        fontSize: 11,
                        fontWeight: 700,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                    }}
                >
                    {effectiveMode === requestedMode ? modeIndicatorLabel : `${modeIndicatorLabel} fallback`}
                </span>
                {hasModeChoice ? (
                    <div
                        style={{
                            background: "#e2e8f0",
                            borderRadius: 999,
                            display: "grid",
                            gap: 2,
                            gridTemplateColumns: "1fr 1fr",
                            padding: 2,
                        }}
                    >
                        {SCROLL_MODES.map((mode) => {
                            const isActive = requestedMode === mode;
                            const isSupported = activeExample.supportedScrollModes.includes(mode);
                            return (
                                <a
                                    href={isSupported ? getModeHref(mode) : undefined}
                                    key={mode}
                                    style={{
                                        alignItems: "center",
                                        background: isActive ? "#0f172a" : "transparent",
                                        border: 0,
                                        borderRadius: 999,
                                        color: isActive ? "#fff" : isSupported ? "#334155" : "#94a3b8",
                                        cursor: isSupported ? "pointer" : "not-allowed",
                                        display: "inline-flex",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        justifyContent: "center",
                                        minWidth: 0,
                                        opacity: isSupported ? 1 : 0.6,
                                        padding: "6px 9px",
                                        pointerEvents: isSupported ? "auto" : "none",
                                        textDecoration: "none",
                                    }}
                                >
                                    {mode === "window" ? "Win" : "Cont"}
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <span
                        style={{
                            background: isWindowScrollMode(effectiveMode) ? "#dbeafe" : "#e2e8f0",
                            borderRadius: 999,
                            color: isWindowScrollMode(effectiveMode) ? "#1d4ed8" : "#334155",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "6px 9px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        only
                    </span>
                )}
            </div>
            <aside
                style={{
                    background: "#fff",
                    borderRight: "1px solid #eee",
                    bottom: 16,
                    boxShadow: isMobile ? "0 20px 48px rgba(15, 23, 42, 0.18)" : "none",
                    left: isMobile ? 0 : 16,
                    overflowY: "auto",
                    padding: isMobile ? "88px 16px 20px" : "0 12px 0 0",
                    position: "fixed",
                    top: isMobile ? 0 : 16,
                    transform: isMobile ? (isSidebarOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
                    transition: "transform 180ms ease",
                    width: SIDEBAR_WIDTH,
                    zIndex: 20,
                }}
            >
                <h1 style={{ marginBottom: 12, marginTop: 0 }}>Legend List Web Example</h1>
                <h2 style={{ marginTop: 0 }}>Legend List Web Examples</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {EXAMPLES.map((example) => {
                        const href = `/${example.path}`;
                        const isActive = pathname === href;
                        const supportedLabel = getSupportedModeLabel(example.supportedScrollModes);
                        return (
                            <a
                                href={href}
                                key={example.path}
                                onClick={(event) => {
                                    event.preventDefault();
                                    router.navigate({ search: true, to: href as any });
                                }}
                                style={{
                                    background: isActive ? "#eef6ff" : "#fff",
                                    border: isActive ? "1px solid #8ab4f8" : "1px solid #ddd",
                                    borderRadius: 6,
                                    color: "inherit",
                                    cursor: "pointer",
                                    padding: "8px 10px",
                                    textDecoration: "none",
                                }}
                            >
                                <div style={{ fontWeight: 600 }}>{example.title}</div>
                                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{supportedLabel}</div>
                            </a>
                        );
                    })}
                </div>
            </aside>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: isMobile ? 0 : CONTENT_OFFSET,
                    ...(isWindowScrollMode(effectiveMode)
                        ? { minHeight: `calc(100svh - ${contentTopPadding + layoutPadding}px)` }
                        : { height: `calc(100svh - ${contentTopPadding + layoutPadding}px)`, overflow: "hidden" }),
                    minWidth: 0,
                    padding: `${contentTopPadding}px ${layoutPadding}px ${layoutPadding}px`,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

const rootRoute = createRootRoute({
    component: SidebarLayout,
    validateSearch: (search: Record<string, unknown>) => ({
        scroll: parseRequestedScrollMode(search),
    }),
});

const routes = EXAMPLES.map((example) =>
    createRoute({
        component: () => <ExampleRouteFrame example={example} />,
        getParentRoute: () => rootRoute,
        path: example.path,
    }),
);

function IndexRedirect() {
    const router = useRouter();

    React.useEffect(() => {
        router.navigate({ search: true, to: `/${EXAMPLES[0].path}` as any });
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

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

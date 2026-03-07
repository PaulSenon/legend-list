import type { CSSProperties } from "react";
import React from "react";

export type ExampleScrollMode = "container" | "window";

type ExampleScrollModeContextValue = {
    effectiveMode: ExampleScrollMode;
    isFallback: boolean;
    requestedMode: ExampleScrollMode;
    supportedModes: readonly ExampleScrollMode[];
};

const ExampleScrollModeContext = React.createContext<ExampleScrollModeContextValue | null>(null);

export function ExampleScrollModeProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: ExampleScrollModeContextValue;
}) {
    return <ExampleScrollModeContext.Provider value={value}>{children}</ExampleScrollModeContext.Provider>;
}

export function useExampleScrollMode() {
    const value = React.useContext(ExampleScrollModeContext);
    if (!value) {
        throw new Error("useExampleScrollMode must be used within ExampleScrollModeProvider");
    }
    return value;
}

export function isWindowScrollMode(mode: ExampleScrollMode) {
    return mode === "window";
}

export function pickScrollModeStyle(
    mode: ExampleScrollMode,
    containerStyle: CSSProperties,
    windowStyle: CSSProperties = {},
) {
    return mode === "window" ? windowStyle : containerStyle;
}

export function getDefaultExampleWrapperStyle(mode: ExampleScrollMode, gap = 8): CSSProperties {
    return {
        display: "flex",
        flexDirection: "column",
        gap,
        ...(mode === "window" ? {} : { flex: 1, minHeight: 0 }),
    };
}

export function getDefaultLegendListStyle(mode: ExampleScrollMode, style: CSSProperties = {}): CSSProperties {
    return mode === "window" ? style : { flex: 1, minHeight: 0, ...style };
}

export function getStickyExampleChromeStyle(mode: ExampleScrollMode, top = 72): CSSProperties {
    if (mode !== "window") {
        return {};
    }

    return {
        position: "sticky",
        top,
        zIndex: 20,
    };
}

import React from "react";

import { LegendList } from "@legendapp/list/react";
import { getDefaultLegendListStyle, isWindowScrollMode, useExampleScrollMode } from "./scrollMode";

export default function MVCPTestExample() {
    const { effectiveMode } = useExampleScrollMode();
    const [heights, setHeights] = React.useState<Record<number, number>>({});
    const data = React.useMemo(() => Array.from({ length: 30 }, (_, i) => ({ id: String(i) })), []);
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    const getHeight = (index: number) => heights[index] ?? 300;
    const [lastChangedIndex, setLastChangedIndex] = React.useState<number | null>(null);

    return (
        <div
            style={{
                background: "#456",
                display: "flex",
                flex: 1,
                flexDirection: "column",
                gap: 12,
                minHeight: 0,
                position: "relative",
            }}
        >
            <div style={{ color: "#e2e8f0", fontSize: 13 }}>
                MVCP test reproduces maintainVisibleContentPosition behavior when item heights change above the
                viewport.
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 12 }}>
                Start near item 10, then tap a card. The card above it grows by 100px and the viewport should stay
                visually anchored.
            </div>
            <LegendList
                data={data}
                estimatedItemSize={300}
                initialScrollIndex={10}
                keyExtractor={(it) => it?.id}
                recycleItems
                renderItem={({ index }: { index: number }) => {
                    const h = getHeight(index);
                    const bg = ["#f87171", "#34d399", "#facc15", "#a78bfa", "#60a5fa", "#fb923c", "#d1d5db"][index % 7];
                    const targetIndex = Math.max(0, index - 1);
                    return (
                        <button
                            onClick={() => {
                                setLastChangedIndex(targetIndex);
                                setHeights((prev) => ({ ...prev, [targetIndex]: (prev[targetIndex] ?? 300) + 100 }));
                            }}
                            style={{
                                alignItems: "center",
                                background: index === lastChangedIndex ? "#0f172a" : bg,
                                color: "white",
                                display: "flex",
                                height: h,
                                justifyContent: "center",
                                position: "relative",
                                width: "100%",
                            }}
                            type="button"
                        >
                            <div style={{ fontSize: 12, left: 10, position: "absolute", top: 8 }}>
                                item #{index} height: {h}
                            </div>
                            <span style={{ color: "white" }}>Grow item #{targetIndex}</span>
                        </button>
                    );
                }}
                style={getDefaultLegendListStyle(effectiveMode)}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

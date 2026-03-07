import React from "react";

import { LegendList } from "@legendapp/list/react";
import {
    getDefaultExampleWrapperStyle,
    getDefaultLegendListStyle,
    getStickyExampleChromeStyle,
    isWindowScrollMode,
    useExampleScrollMode,
} from "./scrollMode";
import { generateItems, type SimpleItem } from "./utils";

export default function LazyListExample() {
    const { effectiveMode } = useExampleScrollMode();
    const data = React.useMemo(() => generateItems(120), []);
    const [selectedId, setSelectedId] = React.useState<string | undefined>();
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    return (
        <div style={getDefaultExampleWrapperStyle(effectiveMode)}>
            <div
                style={{
                    ...getStickyExampleChromeStyle(effectiveMode),
                    background: useWindowScroll ? "rgba(255, 255, 255, 0.96)" : undefined,
                    border: "1px solid #eee",
                    borderRadius: 8,
                    padding: 12,
                }}
            >
                <div style={{ fontWeight: "bold" }}>Countries lazy scrollview (demo data)</div>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 8, display: "flex", flex: 1, minHeight: 0 }}>
                <LegendList<SimpleItem>
                    data={data}
                    estimatedItemSize={48}
                    extraData={selectedId}
                    keyExtractor={(item) => item.id}
                    maintainVisibleContentPosition
                    recycleItems
                    renderItem={({ item, index }: { item: SimpleItem; index: number }) => (
                        <button
                            onClick={() => setSelectedId(item.id)}
                            style={{
                                alignItems: "center",
                                background: selectedId === item.id ? "#eef6ff" : "#fff",
                                borderBottom: "1px solid #f0f0f0",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px 12px",
                                textAlign: "left",
                                width: "100%",
                            }}
                            type="button"
                        >
                            <div>Item {index}</div>
                            <div style={{ color: "#666", fontSize: 12 }}>id: {item.id}</div>
                        </button>
                    )}
                    style={getDefaultLegendListStyle(effectiveMode, { width: "100%" })}
                    useWindowScroll={useWindowScroll}
                />
            </div>
        </div>
    );
}

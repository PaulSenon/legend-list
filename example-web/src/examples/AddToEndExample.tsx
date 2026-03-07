import React from "react";

import { LegendList } from "@legendapp/list/react";
import {
    getDefaultExampleWrapperStyle,
    getDefaultLegendListStyle,
    getStickyExampleChromeStyle,
    isWindowScrollMode,
    useExampleScrollMode,
} from "./scrollMode";
import type { SimpleItem } from "./utils";
import { generateItems } from "./utils";

export default function AddToEndExample() {
    const { effectiveMode } = useExampleScrollMode();
    const [data, setData] = React.useState(() => generateItems(50));
    const useWindowScroll = isWindowScrollMode(effectiveMode);
    const addMore = () => setData((d) => [...d, ...generateItems(20, d.length)]);

    return (
        <div style={getDefaultExampleWrapperStyle(effectiveMode)}>
            <div
                style={{
                    ...getStickyExampleChromeStyle(effectiveMode),
                    background: useWindowScroll ? "rgba(255, 255, 255, 0.96)" : undefined,
                    paddingBottom: useWindowScroll ? 8 : 0,
                }}
            >
                <button onClick={addMore} type="button">
                    Add 20 items
                </button>
            </div>
            <LegendList<SimpleItem>
                data={data}
                estimatedItemSize={80}
                keyExtractor={(it) => it?.id}
                renderItem={({ item }: { item: SimpleItem }) => (
                    <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: 12 }}>
                        <div>Item {item.id}</div>
                    </div>
                )}
                style={getDefaultLegendListStyle(effectiveMode)}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

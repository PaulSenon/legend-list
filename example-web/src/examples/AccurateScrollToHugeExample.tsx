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

const Size = 100;

export default function AccurateScrollToHugeExample() {
    const { effectiveMode } = useExampleScrollMode();
    const ref = React.useRef<any>(null);
    const data = React.useMemo(() => generateItems(20000), []);
    const useWindowScroll = isWindowScrollMode(effectiveMode);
    const [targetId, setTargetId] = React.useState<string | null>(null);

    return (
        <div style={getDefaultExampleWrapperStyle(effectiveMode)}>
            <div
                style={{
                    ...getStickyExampleChromeStyle(effectiveMode),
                    background: useWindowScroll ? "rgba(255, 255, 255, 0.96)" : undefined,
                    display: "flex",
                    gap: 8,
                    paddingBottom: useWindowScroll ? 8 : 0,
                }}
            >
                <button
                    onClick={() => {
                        setTargetId(data[12345].id);
                        ref.current?.scrollToIndex?.({ animated: true, index: 12345 });
                    }}
                    type="button"
                >
                    Scroll to 12,345
                </button>
                <button
                    onClick={() => {
                        setTargetId(data[data.length - 1].id);
                        ref.current?.scrollToEnd?.({ animated: true });
                    }}
                    type="button"
                >
                    Scroll to end
                </button>
            </div>
            <LegendList
                data={data}
                estimatedItemSize={Size}
                keyExtractor={(it) => it?.id}
                recycleItems
                ref={ref}
                renderItem={({ item }: { item: SimpleItem }) => (
                    <div
                        style={{
                            background: item.id === targetId ? "#fee2e2" : "#fff",
                            borderBottom: "1px solid #f0f0f0",
                            color: item.id === targetId ? "#991b1b" : "#111827",
                            padding: 8,
                        }}
                    >
                        <div>Item {item.id}</div>
                    </div>
                )}
                style={getDefaultLegendListStyle(effectiveMode)}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

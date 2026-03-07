import React from "react";

import { LegendList, type LegendListRenderItemProps } from "@legendapp/list/react";
import { ItemCard } from "./cards-renderItem";
import {
    getDefaultExampleWrapperStyle,
    getDefaultLegendListStyle,
    isWindowScrollMode,
    useExampleScrollMode,
} from "./scrollMode";
import { generateItems, type SimpleItem } from "./utils";

export default function BidirectionalInfiniteListExample() {
    const { effectiveMode } = useExampleScrollMode();
    const [start, setStart] = React.useState(-50);
    const [end, setEnd] = React.useState(50);
    const data = React.useMemo(() => generateItems(end - start + 1, start), [start, end]);
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    return (
        <div style={getDefaultExampleWrapperStyle(effectiveMode, 12)}>
            <div style={{ color: "#475569", fontSize: 13 }}>Scroll upward to prepend older items in either mode.</div>
            <LegendList
                data={data}
                drawDistance={5000}
                estimatedItemSize={200}
                initialScrollIndex={data.length - 1}
                keyExtractor={(it) => it?.id}
                maintainVisibleContentPosition
                onEndReached={() => {
                    setEnd((value) => value + 50);
                }}
                onEndReachedThreshold={0.5}
                onStartReached={() => {
                    setStart((s) => s - 50);
                }}
                onStartReachedThreshold={0.5}
                renderItem={(props: LegendListRenderItemProps<SimpleItem>) => (
                    <ItemCard
                        {...props}
                        numSentences={(idx) => {
                            const base = Math.abs(idx % 6) + 1;
                            return base + Math.floor(idx % 3);
                        }}
                        theme="light"
                    />
                )}
                style={getDefaultLegendListStyle(effectiveMode, { width: "100%" })}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

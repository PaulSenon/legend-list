import React from "react";

import { LegendList, type LegendListRenderItemProps } from "@legendapp/list/react";
import { ItemCard } from "./cards-renderItem";
import {
    getDefaultExampleWrapperStyle,
    getDefaultLegendListStyle,
    getStickyExampleChromeStyle,
    isWindowScrollMode,
    useExampleScrollMode,
} from "./scrollMode";
import type { SimpleItem } from "./utils";
import { generateItems } from "./utils";

export default function AccurateScrollToExample() {
    const { effectiveMode } = useExampleScrollMode();
    const ref = React.useRef<any>(null);
    const data = React.useMemo(() => generateItems(1000), []);
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    return (
        <div style={{ ...getDefaultExampleWrapperStyle(effectiveMode), paddingTop: 8 }}>
            <div
                style={{
                    ...getStickyExampleChromeStyle(effectiveMode),
                    background: useWindowScroll ? "rgba(255, 255, 255, 0.96)" : undefined,
                    display: "flex",
                    gap: 8,
                    paddingBottom: useWindowScroll ? 8 : 0,
                }}
            >
                <button onClick={() => ref.current?.scrollToIndex?.({ animated: true, index: 300 })} type="button">
                    Scroll to 300
                </button>
                <button onClick={() => ref.current?.scrollToIndex?.({ animated: true, index: 700 })} type="button">
                    Scroll to 700
                </button>
            </div>
            <LegendList<SimpleItem>
                data={data}
                estimatedItemSize={100}
                keyExtractor={(it) => it?.id}
                ref={ref}
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
                style={getDefaultLegendListStyle(effectiveMode, { borderRadius: 8 })}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

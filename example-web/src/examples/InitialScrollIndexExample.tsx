import React from "react";

import { LegendList } from "@legendapp/list/react";
import { random } from "../random";
import { getDefaultLegendListStyle, isWindowScrollMode, useExampleScrollMode } from "./scrollMode";

type Row = { id: string; type: "item" | "separator" };

const heights = new Map<string, number>();
const INITIAL_INDEX = 200;

const seed = 9;
const getHeight = (id: string) => {
    if (heights.has(id)) {
        return heights.get(id)!;
    }
    const height = Math.floor(random(seed) * 100) + 50;
    heights.set(id, height);
    return height;
};
export default function InitialScrollIndexExample() {
    const { effectiveMode } = useExampleScrollMode();
    const ref = React.useRef<any>(null);
    const data = React.useMemo<Row[]>(
        () => Array.from({ length: 500 }, (_, i) => ({ id: String(i), type: i % 3 === 0 ? "separator" : "item" })),
        [],
    );
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    React.useEffect(() => {
        const raf = requestAnimationFrame(() => {
            ref.current?.scrollToIndex?.({ animated: false, index: INITIAL_INDEX });
        });

        return () => {
            cancelAnimationFrame(raf);
        };
    }, [effectiveMode]);

    return (
        <div style={{ background: "#456", display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
            <LegendList<Row>
                data={data}
                drawDistance={2000}
                estimatedItemSize={200}
                // getEstimatedItemSize={(item) => (item.type === "separator" ? 52 : 400)}
                initialScrollIndex={INITIAL_INDEX}
                keyExtractor={(it) => it?.id}
                ref={ref}
                renderItem={({ item, index }: { item: Row; index: number }) =>
                    item.type === "separator" ? (
                        <div
                            style={{
                                alignItems: "center",
                                backgroundColor: "black",
                                height: 52,
                                justifyContent: "center",
                            }}
                        >
                            <div style={{ color: "white" }}>Separator {item.id}</div>
                        </div>
                    ) : (
                        <div
                            style={{
                                alignItems: "center",
                                background: index === INITIAL_INDEX ? "#ef4444" : index % 2 ? "#f0f0f0" : "#ccc",
                                color: index === INITIAL_INDEX ? "#fff" : "#111827",
                                height: getHeight(item.id),
                                justifyContent: "center",
                            }}
                        >
                            <div>
                                Item {item.id}
                                {index === INITIAL_INDEX ? " (initial target)" : ""}
                            </div>
                        </div>
                    )
                }
                style={getDefaultLegendListStyle(effectiveMode, styles.list)}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

const styles = {
    list: {
        flex: 1,
        minHeight: 0,
        // padding: 16,
    },
};

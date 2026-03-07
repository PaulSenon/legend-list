import React from "react";

import { LegendList } from "@legendapp/list/react";
import { getDefaultLegendListStyle, isWindowScrollMode, useExampleScrollMode } from "./scrollMode";

type SimpleItem = { id: string };

export default function MutableCellsExample() {
    const { effectiveMode } = useExampleScrollMode();
    const [data] = React.useState<SimpleItem[]>(() => Array.from({ length: 60 }, (_, i) => ({ id: String(i) })));
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    return (
        <LegendList<SimpleItem>
            data={data}
            estimatedItemSize={100}
            extraData={expanded}
            keyExtractor={(it) => it?.id}
            renderItem={({ item }: { item: SimpleItem }) => {
                const isOpen = !!expanded[item.id];
                return (
                    <div style={{ borderBottom: "1px solid #f0f0f0", padding: 12 }}>
                        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                            <div>Item {item.id}</div>
                            <button
                                onClick={() => setExpanded((e) => ({ ...e, [item.id]: !e[item.id] }))}
                                type="button"
                            >
                                {isOpen ? "Collapse" : "Expand"}
                            </button>
                        </div>
                        {isOpen && (
                            <div style={{ background: "#fafafa", borderRadius: 6, marginTop: 8, padding: 8 }}>
                                <div>
                                    Extra content for item {item.id}. Click the button to toggle height and test
                                    measurement updates.
                                </div>
                            </div>
                        )}
                    </div>
                );
            }}
            style={getDefaultLegendListStyle(effectiveMode)}
            useWindowScroll={useWindowScroll}
        />
    );
}

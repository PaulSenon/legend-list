import React from "react";

import { LegendList } from "@legendapp/list/react";
import { getDefaultLegendListStyle, isWindowScrollMode, useExampleScrollMode } from "./scrollMode";
import type { SimpleItem } from "./utils";
import { generateItems } from "./utils";

export default function ColumnsExample() {
    const { effectiveMode } = useExampleScrollMode();
    const [data, setData] = React.useState(generateItems(8));
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    React.useEffect(() => {
        const t = setTimeout(() => setData(generateItems(20)), 1000);
        return () => clearTimeout(t);
    }, []);
    return (
        <div style={{ background: "#fff", display: "flex", flex: 1, minHeight: 0, width: "100%" }}>
            <LegendList
                columnWrapperStyle={{ columnGap: 16, rowGap: 16 }}
                data={data}
                keyExtractor={(it) => it?.id}
                numColumns={3}
                renderItem={({ item }: { item: SimpleItem }) => (
                    <div style={{ aspectRatio: 1 }}>
                        <div style={{ backgroundColor: "red", borderRadius: 8, height: "100%", width: "100%" }} />
                        <div>Item {item.id}</div>
                    </div>
                )}
                style={getDefaultLegendListStyle(effectiveMode, { width: "100%" })}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

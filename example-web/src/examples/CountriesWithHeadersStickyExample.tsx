import React from "react";

import { LegendList } from "@legendapp/list/react";
import {
    getDefaultExampleWrapperStyle,
    getDefaultLegendListStyle,
    getStickyExampleChromeStyle,
    isWindowScrollMode,
    useExampleScrollMode,
} from "./scrollMode";
import { useCountries } from "./utils";

type CountryRowHeader = { id: string; type: "header"; title: string };
type CountryRowItem = { id: string; type: "row"; name: string; flag: string };
type CountryRow = CountryRowHeader | CountryRowItem;

export default function CountriesWithHeadersStickyExample() {
    const { effectiveMode } = useExampleScrollMode();
    const { countriesData, load } = useCountries();
    const useWindowScroll = isWindowScrollMode(effectiveMode);

    React.useEffect(() => void load(), [load]);
    const { data, sticky } = React.useMemo(() => {
        const out: CountryRow[] = [];
        const stickyIndices: number[] = [];
        let idx = 0;
        let lastLetter = "";
        for (const c of countriesData) {
            const letter = c.name?.[0] ?? "?";
            if (letter !== lastLetter) {
                out.push({ id: `h-${letter}`, title: letter, type: "header" });
                stickyIndices.push(idx);
                idx++;
                lastLetter = letter;
            }
            out.push({ flag: c.flag, id: c.id, name: c.name, type: "row" });
            idx++;
        }
        return { data: out, sticky: stickyIndices };
    }, [countriesData]);

    return (
        <div style={getDefaultExampleWrapperStyle(effectiveMode)}>
            <div
                style={{
                    ...getStickyExampleChromeStyle(effectiveMode),
                    background: useWindowScroll ? "rgba(255, 255, 255, 0.96)" : undefined,
                    paddingBottom: useWindowScroll ? 8 : 0,
                }}
            >
                <div style={{ color: "#475569", fontSize: 13, fontWeight: 600 }}>
                    Sticky page header + sticky section headers
                </div>
            </div>
            <LegendList<CountryRow>
                data={data}
                estimatedItemSize={60}
                keyExtractor={(it) => it?.id}
                renderItem={({ item }: { item: CountryRow }) =>
                    item.type === "header" ? (
                        <div style={{ background: "#fafafa", borderBottom: "1px solid #eee", padding: 8 }}>
                            <div style={{ fontWeight: "bold" }}>{item.title}</div>
                        </div>
                    ) : (
                        <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: 10 }}>
                            <div>
                                {item.flag} {item.name}
                            </div>
                        </div>
                    )
                }
                stickyHeaderIndices={sticky}
                style={getDefaultLegendListStyle(effectiveMode, { borderRadius: 8, width: "100%" })}
                useWindowScroll={useWindowScroll}
            />
        </div>
    );
}

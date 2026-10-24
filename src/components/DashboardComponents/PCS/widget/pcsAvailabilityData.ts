import type { TimeseriesDataSource } from "../../../../types/timeseries/datasource";

export const DAY_MS = 24 * 60 * 60 * 1000;
export const POWER_ALIAS = "Active Power";
export const PCS_POWER_SOURCE: TimeseriesDataSource = {
  devices: { patterns: ["_pcs_pcs_"], ids: [] },
  keys: [{ key: "active_power", alias: POWER_ALIAS, keyType: "common" }],
  aggregation: { func: "avg", interval: 1, intervalType: "day" },
  timeRange: { type: "last", interval: 7, intervalType: "day" },
  orderBy: "ASC",
};

type Data = Record<string, Record<string, { ts: number; value: number | null }[]>>;
const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#9333EA", "#06B6D4"];

export function pcsPowerSeries(data: Data | null, configuredIds: string[] = []) {
  const ids = [...new Set([...configuredIds, ...Object.keys(data || {})])]
    .filter(id => /_pcs_pcs_\d+$/i.test(id))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(0, 5);

  return ids.map((id, index) => ({
    type: "spline",
    name: `PCS-${id.match(/_(\d+)$/)?.[1]}`,
    color: COLORS[index],
    pointInterval: DAY_MS,
    // A missing daily reading stays a gap, including a real null from the API.
    data: (data?.[id]?.[POWER_ALIAS] || [])
      .filter(point => Number.isFinite(Number(point.ts)))
      .map(point => [Number(point.ts), point.value == null || String(point.value).trim() === "" || !Number.isFinite(Number(point.value)) ? null : Number(point.value)] as [number, number | null])
      .sort((a, b) => a[0] - b[0]),
    marker: { enabled: true, radius: 3 },
  }));
}

import type { AlarmRow } from "../../../../hooks/useAlarmLatest";

// Match PCS devices themselves, excluding their banks/racks and other equipment.
const PCS_DEVICE = /(?:^|_)pcs_(?:pcs_)?(\d+)$/i;

export function getPCSAlarmSummary(rows: AlarmRow[]) {
  const alarms = rows
    .filter(row => PCS_DEVICE.test(row.deviceId || row.device) && row.status !== "Self Resolved")
    .map(row => ({
      ...row,
      severity: row.severity?.trim().toUpperCase() || "UNKNOWN",
    }))
    .sort((a, b) => (Date.parse(b.rawTimeStamp) || 0) - (Date.parse(a.rawTimeStamp) || 0));

  const counts: Record<string, number> = { CRITICAL: 0, MAJOR: 0, MINOR: 0, INFO: 0 };
  for (const row of alarms) counts[row.severity] = (counts[row.severity] || 0) + 1;

  return {
    counts,
    total: alarms.length,
    recent: alarms.slice(0, 5).map(row => ({
      id: `${row.deviceId || row.device}-${row.type}-${row.rawTimeStamp}`,
      time: row.time.split(",").pop()?.trim() || "--",
      fullTime: row.time || "--",
      message: row.type || "--",
      device: `PCS-${(row.deviceId || row.device).match(PCS_DEVICE)?.[1]}`,
      severity: row.severity,
    })),
  };
}

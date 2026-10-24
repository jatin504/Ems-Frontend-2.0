import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import GraphLayout from "../../../Layouts/WidgetsLayout/GraphsLayout/GraphLayout";
import SplineGraph from "../../../Graphs/RevampCharts/SplineGraph";
import WidgetTitle from "../../../Common/WidgetTitle";
import useTimeseriesData from "../../../../hooks/useTimeseriesData";
import { useDevices } from "../../../../hooks/useDevices";
import type { ExportFunctions } from "../../../../types/graphExport/export";
import { DAY_MS, PCS_POWER_SOURCE, pcsPowerSeries } from "./pcsAvailabilityData";

export default function PCSAvailability() {
  const { data, loading, error, fetchData } = useTimeseriesData();
  const { devices, loading: devicesLoading } = useDevices();
  const fetchRef = useRef(fetchData);
  fetchRef.current = fetchData;
  const [rangeEnd] = useState(() => Date.now());
  const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);
  const textColor = useColorModeValue("#1A202C", "#E6E6E6");
  const mutedColor = useColorModeValue("#64748B", "#B8C4D4");
  const gridColor = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");

  useEffect(() => {
    // Fetch the full seven-day window once; no one-minute range or polling.
    fetchRef.current(PCS_POWER_SOURCE);
  }, []);

  const series = useMemo(() => pcsPowerSeries(
    data, (devices || []).map(device => device.device_id)
  ), [data, devices]);
  const hasData = series.some(item => item.data.some(([, value]) => value !== null));
  const status = error ? "Unable to load PCS power history"
    : loading || devicesLoading ? "Loading last 7 days..."
    : !hasData ? "No PCS power data in the last 7 days"
    : "Daily average active power (kW) · Last 7 days";

  return (
    <GraphLayout
      title={<Box minW={0}>
        <WidgetTitle color={textColor}>PCS Availability</WidgetTitle>
        <Text role={error || loading || !hasData ? "status" : undefined} fontSize="10px" color={error ? "red.500" : mutedColor}>
          {status}
        </Text>
      </Box>}
      width="100%"
      height="300px"
      fullScreen
      timeWindow={false}
      onExport={exportFunctions}
      WidgetProps={{ "data-testid": "pcs-availability", mt: 0, minW: 0, borderRadius: "10px", boxShadow: "none" }}
      contentProps={{ height: "calc(100% - 48px)", pb: 0, minH: 0 }}
    >
      <SplineGraph
        apiData={series}
        height={220}
        onExportReady={setExportFunctions}
        props={{
          xAxis: {
            type: "datetime",
            min: rangeEnd - 7 * DAY_MS,
            max: rangeEnd,
            tickInterval: DAY_MS,
            labels: {
              style: { color: mutedColor },
              formatter: function (this: { value: number }) {
                return new Date(this.value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" });
              },
            },
            gridLineColor: gridColor,
          },
          yAxis: {
            title: { text: "Active Power (kW)" },
            labels: { style: { color: textColor } },
            gridLineColor: gridColor,
          },
          tooltip: { shared: true, valueDecimals: 2, valueSuffix: " kW" },
          plotOptions: { series: { connectNulls: false, lineWidth: 2, marker: { enabled: true, radius: 3 } } },
          legend: { enabled: true, itemStyle: { color: textColor } },
        }}
      />
    </GraphLayout>
  );
}

import React, { useEffect, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import useTimeseriesData from "../../../../hooks/useTimeseriesData";
import { useLatestPOIData } from "../../../../hooks/poi_meter/useLatestPOIData";

/* ================= Battery ================= */

const BatteryIcon = () => (
  <svg width="64" height="74" viewBox="0 0 64 74" fill="none">
    <rect
      x="16"
      y="10"
      width="32"
      height="46"
      rx="3"
      fill="#F4FFF3"
      stroke="#36A636"
      strokeWidth="3"
    />

    <rect
      x="22"
      y="5"
      width="7"
      height="5"
      rx="1"
      fill="#36A636"
    />

    <rect
      x="35"
      y="5"
      width="7"
      height="5"
      rx="1"
      fill="#36A636"
    />

    <path
      d="M33 22L27 36H33L30 48L40 33H34L37 22Z"
      fill="#36A636"
    />
  </svg>
);

/* ================= PCS ================= */

const PCSIcon = () => (
  <svg width="70" height="74" viewBox="0 0 70 74" fill="none">

    <rect
      x="18"
      y="10"
      width="34"
      height="48"
      rx="2"
      fill="white"
      stroke="#444"
      strokeWidth="3"
    />

    <line
      x1="36"
      y1="10"
      x2="36"
      y2="58"
      stroke="#DDD"
    />

    <rect
      x="24"
      y="18"
      width="10"
      height="10"
      stroke="#444"
      strokeWidth="2"
    />

    <circle cx="26" cy="35" r="2" fill="#444"/>
    <circle cx="33" cy="35" r="2" fill="#444"/>
    <circle cx="40" cy="35" r="2" fill="#444"/>

    <line x1="24" y1="43" x2="34" y2="43" stroke="#444"/>
    <line x1="24" y1="48" x2="34" y2="48" stroke="#444"/>
    <line x1="24" y1="53" x2="34" y2="53" stroke="#444"/>

    <line
      x1="44"
      y1="22"
      x2="44"
      y2="48"
      stroke="#444"
      strokeWidth="2"
    />

  </svg>
);

/* ================= Transformer ================= */

const TransformerIcon = () => (
  <svg width="70" height="74" viewBox="0 0 70 74" fill="none">

    <rect
      x="22"
      y="24"
      width="26"
      height="24"
      fill="white"
      stroke="#444"
      strokeWidth="3"
    />

    <rect
      x="15"
      y="30"
      width="7"
      height="14"
      fill="white"
      stroke="#444"
      strokeWidth="3"
    />

    <rect
      x="48"
      y="30"
      width="7"
      height="14"
      fill="white"
      stroke="#444"
      strokeWidth="3"
    />

    <line x1="28" y1="26" x2="28" y2="46" stroke="#444"/>
    <line x1="33" y1="26" x2="33" y2="46" stroke="#444"/>
    <line x1="38" y1="26" x2="38" y2="46" stroke="#444"/>
    <line x1="43" y1="26" x2="43" y2="46" stroke="#444"/>

    <line x1="28" y1="16" x2="28" y2="24" stroke="#444" strokeWidth="3"/>
    <line x1="42" y1="16" x2="42" y2="24" stroke="#444" strokeWidth="3"/>

    <circle cx="28" cy="12" r="3" stroke="#444" strokeWidth="2"/>
    <circle cx="42" cy="12" r="3" stroke="#444" strokeWidth="2"/>

    <line x1="24" y1="48" x2="24" y2="60" stroke="#444" strokeWidth="3"/>
    <line x1="46" y1="48" x2="46" y2="60" stroke="#444" strokeWidth="3"/>

    <line x1="18" y1="60" x2="52" y2="60" stroke="#444" strokeWidth="3"/>

  </svg>
);

/* ================= PCC ================= */

const PCCIcon = () => (
  <svg width="74" height="90" viewBox="0 0 74 90" fill="none">
    {/* Top Triangle */}
    <polygon
      points="37,4 31,16 43,16"
      fill="none"
      stroke="#2F76F3"
      strokeWidth="2.5"
    />

    {/* Neck */}
    <line x1="37" y1="16" x2="37" y2="78" stroke="#2F76F3" strokeWidth="2.5"/>

    {/* Cross Arm */}
    <line x1="12" y1="28" x2="62" y2="28" stroke="#2F76F3" strokeWidth="2.5"/>

    <line x1="20" y1="28" x2="37" y2="20" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="54" y1="28" x2="37" y2="20" stroke="#2F76F3" strokeWidth="2"/>

    {/* Side Droppers */}
    <line x1="16" y1="28" x2="16" y2="34" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="58" y1="28" x2="58" y2="34" stroke="#2F76F3" strokeWidth="2"/>

    {/* Outer Arms */}
    <line x1="12" y1="28" x2="2" y2="31" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="62" y1="28" x2="72" y2="31" stroke="#2F76F3" strokeWidth="2"/>

    {/* Tower Legs */}
    <line x1="37" y1="16" x2="20" y2="78" stroke="#2F76F3" strokeWidth="2.5"/>
    <line x1="37" y1="16" x2="54" y2="78" stroke="#2F76F3" strokeWidth="2.5"/>

    {/* Horizontal Braces */}
    <line x1="28" y1="24" x2="46" y2="24" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="25" y1="36" x2="49" y2="36" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="22" y1="48" x2="52" y2="48" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="19" y1="60" x2="55" y2="60" stroke="#2F76F3" strokeWidth="2"/>

    {/* Cross Bracing */}
    <line x1="28" y1="24" x2="46" y2="36" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="46" y1="24" x2="28" y2="36" stroke="#2F76F3" strokeWidth="2"/>

    <line x1="25" y1="36" x2="49" y2="48" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="49" y1="36" x2="25" y2="48" stroke="#2F76F3" strokeWidth="2"/>

    <line x1="22" y1="48" x2="52" y2="60" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="52" y1="48" x2="22" y2="60" stroke="#2F76F3" strokeWidth="2"/>

    <line x1="19" y1="60" x2="55" y2="72" stroke="#2F76F3" strokeWidth="2"/>
    <line x1="55" y1="60" x2="19" y2="72" stroke="#2F76F3" strokeWidth="2"/>

    {/* Base */}
    <line x1="14" y1="78" x2="26" y2="78" stroke="#2F76F3" strokeWidth="2.5"/>
    <line x1="48" y1="78" x2="60" y2="78" stroke="#2F76F3" strokeWidth="2.5"/>
  </svg>
);

/* ================= Arrow ================= */

const Arrow = () => (
  <svg width="64" height="12" viewBox="0 0 64 12" fill="none">
    {/* Line */}
    <line
      x1="2"
      y1="6"
      x2="48"
      y2="6"
      stroke="#2F76F3"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Filled Arrow Head */}
    <path
      d="M48 1
         L60 6
         L48 11
         Z"
      fill="#2F76F3"
    />
  </svg>
);

/* ================= Device ================= */

const Device = ({
  icon,
  title,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  highlight?: boolean;
}) => (
  <VStack spacing={3} flex={1}>
    <Box
      w="98px"
      h="98px"
      borderRadius="full"
      border={highlight ? "3px solid #2F76F3" : "none"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
    </Box>

    <Text
      fontSize="13px"
      fontWeight="600"
      color="#202124"
    >
      {title}
    </Text>
  </VStack>
);
interface SystemTopologyCardProps {
  deviceId?: string;
  selectedDeviceName?: string;
}

const SystemTopologyCard = ({
  deviceId,
  selectedDeviceName = "PCS-01",
}: SystemTopologyCardProps) => {
  const bg = useColorModeValue("white", "#1A202C");
  const border = useColorModeValue("#E2E8F0", "#2D3748");

  const { data, fetchData } = useTimeseriesData();

  useEffect(() => {
    if (!deviceId) return;

    fetchData({
      devices: {
        patterns: [],
        ids: [deviceId],
      },
      keys: [
        { key: "active_power", alias: "active_power", keyType: "common" },
        { key: "reactive_power", alias: "reactive_power", keyType: "common" },
        { key: "soc", alias: "soc", keyType: "common" },
        { key: "power_factor", alias: "power_factor", keyType: "common" },
        { key: "frequency", alias: "frequency", keyType: "common" },
        { key: "voltage", alias: "voltage", keyType: "common" },
      ],
      aggregation: {
        func: "last",
        interval: 1,
        intervalType: "minute",
      },
      timeRange: {
        type: "relative",
        relativeType: "currentDaySoFar",
      },
      orderBy: "ASC",
    } as any);
  }, [deviceId]);

  const poiKeys = useMemo(() => ["power_kw", "frequency_hz", "voltage", "power_factor"], []);
  const { data: poiData } = useLatestPOIData(poiKeys);

  const deviceData = (data as any)?.[deviceId || ""];
  const getLatest = (key: string) => {
    const points = deviceData?.[key] ?? [];
    return points[points.length - 1]?.value ?? null;
  };

  const activePower = getLatest("active_power");
  const reactivePower = getLatest("reactive_power");
  const socVal = getLatest("soc");
  const pcsFreq = getLatest("frequency");
  const pcsVolt = getLatest("voltage");
  const pcsPF = getLatest("power_factor");

  // Format power
  const formatMW = (kwVal: number | null | undefined, defaultMW = "12.46") => {
    if (kwVal === null || kwVal === undefined || Number.isNaN(Number(kwVal))) {
      return `${defaultMW} MW`;
    }
    const n = Number(kwVal);
    if (Math.abs(n) >= 1000) {
      return `${(n / 1000).toFixed(2)} MW`;
    }
    return `${n.toFixed(2)} kW`;
  };

  const formatMVAr = (kvarVal: number | null | undefined, defaultMVAR = "2.10") => {
    if (kvarVal === null || kvarVal === undefined || Number.isNaN(Number(kvarVal))) {
      return `${defaultMVAR} MVAr`;
    }
    const n = Number(kvarVal);
    if (Math.abs(n) >= 1000) {
      return `${(n / 1000).toFixed(2)} MVAr`;
    }
    return `${n.toFixed(2)} kVAr`;
  };

  const batterySocStr = socVal !== null && socVal !== undefined ? `${Number(socVal).toFixed(1)} %` : "56.2 %";
  const batteryPowerStr = formatMW(activePower, "12.46");
  const pcsPowerStr = formatMW(activePower, "12.46");
  const pcsQStr = formatMVAr(reactivePower, "2.10");

  // POI / Grid
  const poiItem = poiData && poiData.length > 0 ? poiData[0] : null;
  const pccVoltRaw = poiItem?.voltage ? parseFloat(poiItem.voltage) : (pcsVolt ? Number(pcsVolt) : null);
  const pccFreqRaw = poiItem?.frequency_hz ? parseFloat(poiItem.frequency_hz) : (pcsFreq ? Number(pcsFreq) : null);
  const pccPFRaw = poiItem?.power_factor ? parseFloat(poiItem.power_factor) : (pcsPF ? Number(pcsPF) : null);

  const pccVoltStr = pccVoltRaw
    ? (pccVoltRaw >= 1000 ? `${(pccVoltRaw / 1000).toFixed(2)} kV` : `${pccVoltRaw.toFixed(1)} V`)
    : "33.01 kV";
  const pccFreqStr = pccFreqRaw ? `${pccFreqRaw.toFixed(2)} Hz` : "50.02 Hz";
  const pccPFStr = pccPFRaw !== null && pccPFRaw !== undefined
    ? `${Math.abs(pccPFRaw).toFixed(3)} ${pccPFRaw >= 0 ? "Lead" : "Lag"}`
    : "0.987 Lead";

  const isOnline = activePower !== null ? Math.abs(Number(activePower)) > 0 : true;

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="14px"
      px={4}
      py={2.5}
      boxShadow="sm"
      w="100%"
    >
      {/* Title */}
      <Text
        fontSize="15px"
        fontWeight="600"
        color="#202124"
        mb={6}
      >
        System Topology
      </Text>

      {/* ================= Top Flow ================= */}

      <Flex
        align="center"
        justify="space-between"
      >
        <Device
          icon={<BatteryIcon />}
          title="Battery Rack"
        />

        <Arrow />

        <Device
          icon={<PCSIcon />}
          title={selectedDeviceName || "PCS-01"}
          highlight
        />

        <Arrow />

        <Device
          icon={<TransformerIcon />}
          title="Transformer"
        />

        <Arrow />

        <Device
          icon={<PCCIcon />}
          title="PCC"
        />
      </Flex>

      {/* Gap */}
      <Box h="20px" />

      {/* ================= Bottom ================= */}

      <Flex
        justify="space-between"
        align="stretch"
      >
        {/* Battery */}

        <VStack
          flex={1}
          spacing={4}
          align="center"
        >
          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              SOC
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {batterySocStr}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              P
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {batteryPowerStr}
            </Text>
          </HStack>
        </VStack>

        <Divider
          orientation="vertical"
          h="92px"
        />

        {/* ================= PCS ================= */}

        <VStack
          flex={1}
          spacing={4}
          align="center"
        >
          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              P
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {pcsPowerStr}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              Q
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {pcsQStr}
            </Text>
          </HStack>
        </VStack>

        <Divider
          orientation="vertical"
          h="92px"
        />

        {/* ================= Transformer ================= */}

        <VStack
          flex={1}
          spacing={4}
          align="center"
        >
          <Text
            fontWeight="600"
            fontSize="12px"
          >
            33.0 kV / 0.69 kV
          </Text>

          <Box
            px={4}
            py={1}
            borderRadius="full"
            bg={isOnline ? "#E8F7EC" : "#FEF3C7"}
          >
            <Text
              color={isOnline ? "#2E9E49" : "#D97706"}
              fontWeight="600"
              fontSize="12px"
            >
              {isOnline ? "ON" : "STANDBY"}
            </Text>
          </Box>
        </VStack>

        <Divider
          orientation="vertical"
          h="92px"
        />

        {/* ================= PCC ================= */}

        <VStack
          flex={1}
          spacing={4}
          align="center"
        >
          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              V
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {pccVoltStr}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              F
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {pccFreqStr}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text
              color="#8B8B8B"
              fontSize="12px"
            >
              PF
            </Text>

            <Text
              fontWeight="600"
              fontSize="13px"
            >
              {pccPFStr}
            </Text>
          </HStack>
        </VStack>

      </Flex>
    </Box>
  );
};

export default SystemTopologyCard;
      
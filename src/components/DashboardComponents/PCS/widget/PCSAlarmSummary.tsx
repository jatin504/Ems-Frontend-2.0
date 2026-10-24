import React, { useMemo } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Icon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  MdWarningAmber,
  MdInfoOutline,
} from "react-icons/md";

import { AiFillAlert } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useAlarmLatest } from "../../../../hooks/useAlarmLatest";
import { getPCSAlarmSummary } from "./pcsAlarmSummaryData";

const Counter = ({
  icon,
  color,
  value,
  title,
  textColor,
  subTextColor,
}: any) => (
  <VStack spacing={1} flex={1}>
    <Icon
      as={icon}
      color={color}
      boxSize={5}
    />

    <Text
      color={textColor}
      fontWeight="700"
      fontSize="22px"
      lineHeight="20px"
    >
      {value}
    </Text>

    <Text
      color={subTextColor}
      fontSize="10px"
    >
      {title}
    </Text>
  </VStack>
);

const getBadgeColor = (type: string) => {
  switch (type) {
    case "CRITICAL":
      return "red";
    case "WARNING":
      return "yellow";
    case "MAJOR":
      return "orange";

    case "MINOR":
      return "yellow";

    case "INFO":
      return "blue";

    default:
      return "gray";
  }
};

const PCSAlarmSummary = () => {
  const navigate = useNavigate();
  const { rows, loading, error } = useAlarmLatest();
  const { counts, recent: alarms, total } = useMemo(() => getPCSAlarmSummary(rows), [rows]);
  const unavailable = loading || (!!error && rows.length === 0);
  const extraCounts = Object.entries(counts)
    .filter(([severity, count]) => !["CRITICAL", "MAJOR", "MINOR", "INFO"].includes(severity) && count > 0)
    .map(([severity, count]) => `${severity}: ${count}`).join(" · ");
  const cardBg = useColorModeValue("#FFFFFF", "#0B2239");
  const borderColor = useColorModeValue("rgba(15,23,42,.08)", "rgba(255,255,255,.06)");
  const titleColor = useColorModeValue("#0F172A", "white");
  const mutedColor = useColorModeValue("#64748B", "#9FB1C5");
  const valueColor = useColorModeValue("#0F172A", "white");
  const linkColor = useColorModeValue("#2563EB", "#55A8FF");

  return (
    <Box
      bg={cardBg}
      borderRadius="10px"
      border={`1px solid ${borderColor}`}
      h="300px"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Header */}

      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={3}
        flexShrink={0}
      >
        <Text
          color={titleColor}
          fontWeight="600"
          fontSize="13px"
        >
          Alarms Summary
        </Text>

        <Text
          as="button"
          type="button"
          onClick={() => navigate("/alarms/latest", { state: { fromPCSAlarmSummary: true } })}
          color={linkColor}
          fontSize="11px"
          cursor="pointer"
        >
          View All
        </Text>
      </Flex>

      {/* Counters */}

      <HStack
        px={3}
        spacing={1}
        flexShrink={0}
      >
        <Counter
          icon={AiFillAlert}
          color="#FF4D4F"
          value={unavailable ? "--" : counts.CRITICAL}
          title="Critical"
          textColor={valueColor}
          subTextColor={mutedColor}
        />

        <Counter
          icon={MdWarningAmber}
          color="#FF9800"
          value={unavailable ? "--" : counts.MAJOR}
          title="Major"
          textColor={valueColor}
          subTextColor={mutedColor}
        />

        <Counter
          icon={MdWarningAmber}
          color="#FFD43B"
          value={unavailable ? "--" : counts.MINOR}
          title="Minor"
          textColor={valueColor}
          subTextColor={mutedColor}
        />

        <Counter
          icon={MdInfoOutline}
          color="#4DA3FF"
          value={unavailable ? "--" : counts.INFO}
          title="Info"
          textColor={valueColor}
          subTextColor={mutedColor}
        />
      </HStack>

      {extraCounts && <Text px={4} pt={1} fontSize="10px" color={mutedColor}>{extraCounts}</Text>}
      {error && <Text role="status" px={4} pt={1} fontSize="10px" color="red.500">
        Unable to refresh alarms.{rows.length > 0 ? " Showing last received data." : " Retrying automatically."}
      </Text>}
      <Box px={4} mt={3}>
        <Text
          color={titleColor}
          fontSize="11px"
          fontWeight="600"
        >
          Recent Alarms{!unavailable && ` (${total})`}
        </Text>
      </Box>
            {/* Recent Alarm List */}
      <VStack
        align="stretch"
        spacing={0}
        mt={2}
        px={4}
        pb={2}
        minH={0}
        overflowY="auto"
      >
        {(loading || (!error && alarms.length === 0)) && (
          <Text role="status" fontSize="11px" py={2} color={mutedColor}>
            {loading ? "Loading PCS alarms..." : "No active PCS alarms"}
          </Text>
        )}
        {alarms.map((alarm, index) => (
          <Flex
            key={alarm.id}
            align="center"
            justify="space-between"
            py="5px"
            borderBottom={
              index === alarms.length - 1
                ? "none"
                : `1px solid ${borderColor}`
            }
          >
            {/* Time */}
            <Text
              w="58px"
              fontSize="9px"
              color={mutedColor}
            >
              <span title={alarm.fullTime}>{alarm.time}</span>
            </Text>

            {/* Alarm Message */}
            <Text
              title={alarm.message}
              flex={1}
              minW={0}
              mx={2}
              color={valueColor}
              fontSize="9px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {alarm.message}
            </Text>

            {/* Device */}
            <Text
              w="55px"
              textAlign="center"
              color={mutedColor}
              fontSize="9px"
            >
              {alarm.device}
            </Text>

            {/* Severity */}
            <Badge
              ml={2}
              px={2}
              py="2px"
              borderRadius="3px"
              fontSize="8px"
              colorScheme={getBadgeColor(alarm.severity)}
            >
              {alarm.severity}
            </Badge>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default PCSAlarmSummary;

import React, { useMemo, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useAlarmLatest } from "../../../../hooks/useAlarmLatest";

interface ComplianceProtectionCardProps {
  deviceId?: string;
}

const DEFAULT_PROTECTIONS = [
  {
    key: "grid",
    label: "Grid Code Compliance",
    normalStatus: "Compliant",
  },
  {
    key: "ovp",
    label: "OVP / UVP",
    normalStatus: "OK",
  },
  {
    key: "ocp",
    label: "OCP / SCP",
    normalStatus: "OK",
  },
  {
    key: "otp",
    label: "OTP",
    normalStatus: "OK",
  },
  {
    key: "earth",
    label: "Earth Fault",
    normalStatus: "OK",
  },
  {
    key: "insulation",
    label: "DC Insulation",
    normalStatus: "OK",
  },
];

const PROTECTION_THRESHOLDS = [
  { parameter: "Over Voltage (OVP)", threshold: "110% (36.3 kV)", tripTime: "< 100 ms", status: "Active" },
  { parameter: "Under Voltage (UVP)", threshold: "90% (29.7 kV)", tripTime: "< 200 ms", status: "Active" },
  { parameter: "Over Frequency (OFP)", threshold: "52.00 Hz", tripTime: "< 160 ms", status: "Active" },
  { parameter: "Under Frequency (UFP)", threshold: "47.50 Hz", tripTime: "< 160 ms", status: "Active" },
  { parameter: "Over Current (OCP)", threshold: "120% Rated", tripTime: "< 50 ms", status: "Active" },
  { parameter: "Short Circuit (SCP)", threshold: "200% Instantaneous", tripTime: "< 10 µs", status: "Active" },
  { parameter: "Over Temp (IGBT OTP)", threshold: "85.0 °C", tripTime: "Derate / Trip", status: "Active" },
  { parameter: "DC Insulation", threshold: "> 10 MΩ", tripTime: "Alarm < 1 MΩ", status: "Active" },
  { parameter: "Earth Fault", threshold: "30 mA Residual", tripTime: "< 40 ms", status: "Active" },
];

const ComplianceProtectionCard: React.FC<ComplianceProtectionCardProps> = ({ deviceId }) => {
  const bg = useColorModeValue("white", "#1A202C");
  const border = useColorModeValue("#E2E8F0", "#2D3748");
  const text = useColorModeValue("#1F2937", "white");
  const btnBg = useColorModeValue("white", "#2D3748");
  const btnHover = useColorModeValue("#F8FAFC", "#374151");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rows } = useAlarmLatest();

  // Map active alarms to protection states
  const activeProtections = useMemo(() => {
    const normId = String(deviceId || "").trim().toLowerCase();
    const deviceAlarms = rows.filter((r: any) => {
      const rowId = String(r.deviceId || r.device_id || r.device || "").trim().toLowerCase();
      return normId && (rowId === normId || rowId.includes(normId) || normId.includes(rowId));
    });

    return DEFAULT_PROTECTIONS.map((prot) => {
      let isTripped = false;
      let statusText = prot.normalStatus;

      for (const alarm of deviceAlarms) {
        const msg = String(alarm.type || alarm.message || "").toLowerCase();
        if (prot.key === "ovp" && (msg.includes("voltage") || msg.includes("ovp") || msg.includes("uvp"))) {
          isTripped = true;
          statusText = "Trip";
          break;
        }
        if (prot.key === "ocp" && (msg.includes("current") || msg.includes("ocp") || msg.includes("short"))) {
          isTripped = true;
          statusText = "Trip";
          break;
        }
        if (prot.key === "otp" && (msg.includes("temp") || msg.includes("thermal") || msg.includes("otp"))) {
          isTripped = true;
          statusText = "Alert";
          break;
        }
        if (prot.key === "earth" && (msg.includes("earth") || msg.includes("ground"))) {
          isTripped = true;
          statusText = "Fault";
          break;
        }
        if (prot.key === "insulation" && msg.includes("insulation")) {
          isTripped = true;
          statusText = "Low";
          break;
        }
      }

      return {
        label: prot.label,
        status: statusText,
        isTripped,
      };
    });
  }, [rows, deviceId]);

  return (
    <>
      <Box
        bg={bg}
        border="1px solid"
        borderColor={border}
        borderRadius="12px"
        p={4}
        h="310px"
        w="100%"
        display="flex"
        flexDirection="column"
      >
        <Text
          fontWeight="700"
          fontSize="15px"
          mb={4}
        >
          Compliance & Protection
        </Text>

        <VStack
          spacing={2.5}
          align="stretch"
          flex={1}
        >
          {activeProtections.map((item) => (
            <HStack
              key={item.label}
              justify="space-between"
              spacing={2}
            >
              <HStack spacing={2}>
                {item.isTripped ? (
                  <WarningTwoIcon
                    color="#EF4444"
                    boxSize={3}
                  />
                ) : (
                  <CheckCircleIcon
                    color="#22C55E"
                    boxSize={3}
                  />
                )}

                <Text
                  fontSize="11px"
                  color={text}
                >
                  {item.label}
                </Text>
              </HStack>

              <Text
                fontSize="11px"
                fontWeight="600"
                color={item.isTripped ? "#EF4444" : "#22C55E"}
              >
                {item.status}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Button
          mt={3}
          h="34px"
          size="sm"
          bg={btnBg}
          border="1px solid"
          borderColor={border}
          _hover={{
            bg: btnHover,
          }}
          fontWeight="600"
          fontSize="12px"
          onClick={() => setIsModalOpen(true)}
        >
          Protection Details
        </Button>
      </Box>

      {/* Protection Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg={bg} borderColor={border} borderRadius="12px">
          <ModalHeader fontSize="16px" fontWeight="700">
            Protection & Compliance Settings
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="11px">Protection Parameter</Th>
                  <Th fontSize="11px">Threshold</Th>
                  <Th fontSize="11px">Trip Time</Th>
                  <Th fontSize="11px">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {PROTECTION_THRESHOLDS.map((row) => (
                  <Tr key={row.parameter}>
                    <Td fontSize="12px" fontWeight="600">{row.parameter}</Td>
                    <Td fontSize="12px">{row.threshold}</Td>
                    <Td fontSize="12px">{row.tripTime}</Td>
                    <Td fontSize="12px">
                      <Badge colorScheme="green" fontSize="10px">
                        {row.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComplianceProtectionCard;
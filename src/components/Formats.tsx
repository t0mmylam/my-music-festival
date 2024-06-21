import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { ResponsiveValue } from "@chakra-ui/react";
import { TextAlign } from "@chakra-ui/styled-system";

interface Artist {
  id: string;
  name: string;
}

interface ArtistListProps {
  group: Artist[];
  index: number;
}

const alignment: ResponsiveValue<TextAlign>[] = ["start", "end", "start"];
const textAlignment: ResponsiveValue<TextAlign>[] = ["left", "right", "left"];

const getOffsetToFriday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const offset = dayOfWeek <= 5 ? 5 - dayOfWeek : 0;
  return offset;
};

const formatDate = (offset: number) => {
  const today = new Date();
  today.setDate(today.getDate() + offset);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString(undefined, options);
};

export const Coachella: React.FC<ArtistListProps> = ({ group, index }) => {
  const offsetToFriday = getOffsetToFriday();
  const minorArtists = group.slice(1); // Exclude the headliner

  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(20); // Initial font size

  useEffect(() => {
    const adjustFontSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const maxContainerHeight = 3 * 20 * 1.75; // 3 rows, 20px per row, 1.75 line height
        if (containerHeight > maxContainerHeight && fontSize > 10) {
          setFontSize((prevSize) => prevSize - 1);
        } else if (containerHeight < maxContainerHeight && fontSize < 20) {
          setFontSize((prevSize) => prevSize + 1);
        }
      }
    };

    adjustFontSize();
    const resizeObserver = new ResizeObserver(adjustFontSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [minorArtists, fontSize]);

  return (
    <VStack
      pt={5}
      paddingInline={7}
      display="flex"
      alignItems={alignment[index]}
      style={{ fontFamily: "'Antonio', sans-serif" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minW="100%"
      >
        {index % 2 !== 0 ? (
          <>
            <Box
              mr={3}
              px={2}
              py={1}
              bg="purple.500"
              borderRadius="md"
              color="white"
            >
              <Text fontSize="md" textTransform="uppercase">
                {formatDate(offsetToFriday + index)}
              </Text>
            </Box>
            <Text fontSize="4xl" fontWeight="bold">
              {group[0].name}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="4xl" fontWeight="bold">
              {group[0].name}
            </Text>
            <Box
              ml={3}
              px={2}
              py={1}
              bg="purple.500"
              borderRadius="md"
              color="white"
            >
              <Text fontSize="md" textTransform="uppercase">
                {formatDate(offsetToFriday + index)}
              </Text>
            </Box>
          </>
        )}
      </Box>
      <Box
        ref={containerRef}
        display="flex"
        flexWrap="wrap"
        gap={3}
        width="100%"
        justifyContent={index === 1 ? "flex-end" : "flex-start"}
        fontSize={`${fontSize}px`}
      >
        {minorArtists.map((artist) => (
          <Box key={artist.id}>
            <Text fontSize="inherit" textAlign={textAlignment[index]}>
              {artist.name}
            </Text>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default Coachella;

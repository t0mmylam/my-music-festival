import React from "react";
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
              <Text fontSize="md" textTransform="uppercase">{formatDate(offsetToFriday + index)}</Text>
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
              <Text fontSize="md" textTransform="uppercase">{formatDate(offsetToFriday + index)}</Text>
            </Box>
          </>
        )}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        columnGap={4}
        justifyContent={index === 1 ? "flex-end" : "flex-start"}
      >
        {group.slice(1).map((artist) => (
          <Text fontSize="1xl" key={artist.id} textAlign={textAlignment[index]}>
            {artist.name}
          </Text>
        ))}
      </Box>
    </VStack>
  );
};

export default Coachella;

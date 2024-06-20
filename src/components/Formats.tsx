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

const splitIntoRows = (artists: Artist[], numRows: number) => {
  const rows = [];
  const artistsPerRow = Math.ceil(artists.length / numRows);

  for (let i = 0; i < numRows; i++) {
    rows.push(artists.slice(i * artistsPerRow, (i + 1) * artistsPerRow));
  }

  return rows;
};

export const Coachella: React.FC<ArtistListProps> = ({ group, index }) => {
  const offsetToFriday = getOffsetToFriday();
  const minorArtists = group.slice(1); // Exclude the headliner
  const rows = splitIntoRows(minorArtists, 3); // Split minor artists into 3 rows

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
      {rows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          display="flex"
          flexWrap="wrap"
          columnGap={1.5}
          justifyContent={index === 1 ? "flex-end" : "flex-start"}
        >
          {row.map((artist, artistIndex) => (
            <React.Fragment key={artist.id}>
              <Text fontSize="1xl" textAlign={textAlignment[index]}>
                {artist.name}
              </Text>
              {artistIndex < row.length - 1 && (
                <Text as="span" fontSize="1xl" color="purple.400" px={0}>
                  •
                </Text>
              )}
            </React.Fragment>
          ))}
        </Box>
      ))}
    </VStack>
  );
};

export default Coachella;

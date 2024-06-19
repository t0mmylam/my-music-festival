import React, { useEffect, useState } from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { Coachella } from "../components/Formats";
import { fetchTopArtists } from "../utils/spotifyUtils";

interface Artist {
  id: string;
  name: string;
}

interface SpotifyPageProps {
  token: string;
}

const SpotifyPage: React.FC<SpotifyPageProps> = ({ token }) => {
  const [groupedArtists, setGroupedArtists] = useState<Artist[][]>([[], [], []]);

  useEffect(() => {
    if (token) {
      fetchTopArtists(token).then((artists) => setGroupedArtists(artists));
    }
  }, [token]);

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      bgGradient="linear(to-b, purple.300, purple.300, pink.300, pink.300, orange.200, yellow.100)"
      maxHeight="800"
      minHeight="800"
      display="flex"
      color="black"
      maxWidth="648"
      minWidth="648"
      p={10}
      m={10}
      justifyContent="center"
    >
      <VStack align="center" width={648}>
        <Text fontSize="sm" fontWeight="bold">
          mymusicfestival.com presents
        </Text>
        <Heading as="h2" size="2xl" mt={0}>
          Stationary Quiet
        </Heading>
        {groupedArtists.flat().length > 0 ? (
          <Box width={648}>
            {groupedArtists.map((group, index) => (
              <Coachella key={index} group={group} index={index} />
            ))}
          </Box>
        ) : (
          <Text>No artists found.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default SpotifyPage;

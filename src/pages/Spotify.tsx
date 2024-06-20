import React, { useEffect, useState } from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { Coachella } from "../components/Formats";
import { fetchTopArtists } from "../utils/spotifyUtils";
import mountain from "../assets/mountain.jpg";
import skyline from "../assets/skyline.jpg"

interface Artist {
  id: string;
  name: string;
}

interface SpotifyPageProps {
  token: string;
}

const SpotifyPage: React.FC<SpotifyPageProps> = ({ token }) => {
  const [groupedArtists, setGroupedArtists] = useState<Artist[][]>([
    [],
    [],
    [],
  ]);

  useEffect(() => {
    if (token) {
      fetchTopArtists(token).then((artists) => setGroupedArtists(artists));
    }
  }, [token]);

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${mountain})`} // Use the imported image with a darker overlay
      backgroundSize="contain"
      backgroundPosition="center"
      maxHeight="800"
      minHeight="800"
      display="flex"
      color="white"
      maxWidth="648"
      minWidth="648"
      px={10}
      py={5}
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
            {groupedArtists.slice(1).map((group, index) => (
              <Coachella key={index} group={group} index={index} />
            ))}
            <VStack style={{ fontFamily: "'Antonio', sans-serif" }} spacing={0}>
              <Text pt={5}>AND...</Text>
              <Text fontSize="4xl" fontWeight="bold" pt={0}>
                {groupedArtists[0][0].name}
              </Text>
            </VStack>
          </Box>
        ) : (
          <Text>No artists found.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default SpotifyPage;

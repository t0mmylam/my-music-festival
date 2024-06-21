import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Coachella } from "../components/Formats";
import { fetchTopArtists, fetchProfile } from "../utils/spotifyUtils";
import mountain from "../assets/mountain.jpg";

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
  const [festivalName, setFestivalName] = useState("My Music Festival");
  const [timeRange, setTimeRange] = useState("medium_term");

  useEffect(() => {
    if (token) {
      fetchProfile(token).then((name) => setFestivalName(name));
      fetchTopArtists(token, timeRange).then((artists) =>
        setGroupedArtists(artists)
      );
    }
  }, [token, timeRange]);

  return (
    <Flex minHeight="100vh" py={10} px={5}>
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        width="20%"
        minWidth="200px"
        mr={10}
        backgroundColor="gray.100"
        p={5}
        borderRadius="md"
        boxShadow="md"
      >
        <Box mb={5} width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            Time Range
          </Text>
          <RadioGroup onChange={setTimeRange} value={timeRange}>
            <Stack direction="column" spacing={3}>
              <Radio value="short_term">Past Month</Radio>
              <Radio value="medium_term">Past 6 Months</Radio>
              <Radio value="long_term">Past Year</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box mb={5} width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            Festival Name
          </Text>
          <Input
            placeholder="Enter Festival Name"
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
          />
        </Box>
      </Flex>
      <Box
        textAlign="center"
        fontSize="xl"
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${mountain})`}
        backgroundSize="cover"
        backgroundPosition="center"
        maxHeight="800"
        minHeight="800"
        display="flex"
        color="white"
        maxWidth="648"
        minWidth="648"
        px={10}
        py={5}
        justifyContent="center"
        borderRadius="md"
        boxShadow="lg"
      >
        <VStack align="center" width="100%">
          <Text fontSize="sm" fontWeight="bold">
            mymusicfestival.com presents
          </Text>
          <Heading as="h2" size="2xl" mt={0}>
            {festivalName}
          </Heading>
          {groupedArtists.flat().length > 0 ? (
            <Box width="100%">
              {groupedArtists.slice(1).map((group, index) => (
                <Coachella key={index} group={group} index={index} />
              ))}
              <VStack
                style={{ fontFamily: "'Antonio', sans-serif" }}
                spacing={0}
              >
                <Text pt={5}>AND...</Text>
                <Text fontSize="4xl" fontWeight="bold" pt={0}>
                  {groupedArtists[0][0]?.name}
                </Text>
              </VStack>
            </Box>
          ) : (
            <Text>No artists found.</Text>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default SpotifyPage;

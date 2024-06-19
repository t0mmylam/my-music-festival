import { Box, VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGenerateImage from "../hooks/useGenerateImage";

interface Artist {
    id: string;
    name: string;
}

interface SpotifyPageProps {
    token: string;
}

const SpotifyPage: React.FC<SpotifyPageProps> = ({ token }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const { ref, generateImage, imageUrl } = useGenerateImage();

    useEffect(() => {
        if (token) {
            fetchTopArtists(token).then((artists) => setArtists(artists));
        }
    }, [token]);

    const fetchTopArtists = async (token: string): Promise<Artist[]> => {
        try {
            const response = await fetch(
                "https://api.spotify.com/v1/me/top/artists?limit=20",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 401) {
                logout();
                return [];
            }

            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error("Error fetching top artists:", error);
            logout();
            return [];
        }
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <Box textAlign="center" fontSize="xl">
            <VStack spacing={8}>
                <Heading as="h2" size="2xl" mt={10}>
                    Your Top Spotify Artists
                </Heading>
                {artists.length > 0 ? (
                    <Box mt={10}>
                        <VStack spacing={4} ref={ref}>
                            {artists.map((artist, index) => (
                                <Box
                                    key={artist.id}
                                    p={5}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    width="100%"
                                    textAlign="left"
                                    bg="white"
                                >
                                    <Text fontSize={index < 5 ? "2xl" : "xl"}>{artist.name}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                ) : (
                    <Text>No artists found.</Text>
                )}
                <Button mt={5} onClick={generateImage}>
                    Generate Image
                </Button>
                {imageUrl && (
                    <Box mt={10}>
                        <Heading as="h3" size="lg">Generated Image:</Heading>
                        <Image src={imageUrl} alt="Top Spotify Artists" mt={5} />
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default SpotifyPage;

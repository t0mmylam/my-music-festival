import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SpotifyPage from "./pages/Spotify";
import Header from "./components/Header";
import { db, doc, getDoc, setDoc, auth } from "./firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import CountUp from "react-countup";

function App() {
  const [token, setToken] = useState("");
  const [loginCount, setLoginCount] = useState(0);

  const handleSpotifyLogin = async () => {
    const clientId = "4e30948e5e474f8d8f70601f71cdb64f";
    const redirectUri = "http://localhost:5173/spotify";
    const scope = "user-read-private user-read-email user-top-read";
    const authEndpoint = "https://accounts.spotify.com/authorize";

    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

    window.location.href = loginUrl;
  };

  const incrementLoginCount = async () => {
    try {
      const docRef = doc(db, "counters", "spotifyLogin");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newCount = docSnap.data().count + 1;
        await setDoc(docRef, { count: newCount });
        setLoginCount(newCount);
      } else {
        await setDoc(docRef, { count: 1 });
        setLoginCount(1);
      }
    } catch (error) {
      console.error("Error incrementing login count:", error);
    }
  };

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        await signInAnonymously(auth);
        console.log("Signed in anonymously");

        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
          token = (
            hash
              .substring(1)
              .split("&")
              .find((elem) => elem.startsWith("access_token")) as string
          )?.split("=")[1];

          window.location.hash = "";
          window.localStorage.setItem("token", token);
          incrementLoginCount();
        }

        setToken(token ?? "");
      } catch (error) {
        console.error("Firebase authentication error:", error);
      }
    };

    authenticateAndFetchData();
  }, []);

  useEffect(() => {
    const fetchLoginCount = async () => {
      try {
        const docRef = doc(db, "counters", "spotifyLogin");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLoginCount(docSnap.data().count);
        } else {
          setLoginCount(0);
        }
      } catch (error) {
        console.error("Error fetching login count:", error);
      }
    };

    fetchLoginCount();
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <ChakraProvider>
      <Router>
        <Header token={token} onLogout={logout} />
        <Flex
          direction="column"
          minHeight="100vh"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" width="100%">
            <Routes>
              <Route path="/spotify" element={<SpotifyPage token={token} />} />
              <Route
                path="/"
                element={
                  <VStack spacing={8}>
                    <Heading as="h1" size="2xl" mt={10}>
                      My Music Festival Poster Generator
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                      Discover and create posters based on your top Spotify
                      artists.
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                      Festivals Generated:{" "}
                      <CountUp end={loginCount} duration={1.5} />
                    </Text>
                    {!token ? (
                      <Button
                        colorScheme="green"
                        size="lg"
                        onClick={handleSpotifyLogin}
                      >
                        Login with Spotify
                      </Button>
                    ) : (
                      <Box>
                        <Button colorScheme="red" size="lg" onClick={logout}>
                          Logout
                        </Button>
                      </Box>
                    )}
                  </VStack>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;

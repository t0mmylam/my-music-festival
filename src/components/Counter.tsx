import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import CountUp from "react-countup";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch("http://localhost:5000/count");
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };

    fetchCounter();
  }, []);

  return (
    <Box mt={5}>
      <Text fontSize="xl">
        Number of times incremented:{" "}
        <CountUp end={count} duration={2} />
      </Text>
    </Box>
  );
};

export default Counter;

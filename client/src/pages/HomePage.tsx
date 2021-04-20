import React from 'react';
import { Box, Container, Heading, Select, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function HomePage() {
  return (
    <Container centerContent>
      <Text>Streckar på:</Text>
      <Heading as="h1" size="4xl" mt="8">
        Laban
      </Heading>
      <Box mt="8" p="4" boxShadow="xl" borderRadius="0.5rem" w="100%">
        <MotionBox
          alignItems="center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transformOrigin="left"
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        >
          <Select placeholder="Välj dryck">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </MotionBox>
      </Box>
    </Container>
  );
}

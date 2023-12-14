import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const FetchingDataSpinner = () => (
  <Container centerContent>
    <Flex flexDirection="column" alignItems="center" mt={8}>
      <Text>Hämtar data...</Text>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <Text>Detta kan ta upp emot 30 sekunder</Text>
      </motion.div>
      <Spinner mt={8} size="xl" />
    </Flex>
  </Container>
);

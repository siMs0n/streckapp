import { Box, Container, Flex, Heading, Select } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { Person } from '../../types';

const MotionBox = motion(Box);

interface SelectPersonProps {
  persons: Person[];
  selectedPersonId: string;
  onChangeSelectedPerson: (personId: string) => void;
}

const SelectPerson = ({
  persons,
  selectedPersonId,
  onChangeSelectedPerson,
}: SelectPersonProps) => {
  return (
    <Container centerContent>
      <Flex
        w="100%"
        height="90vh"
        py={2}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <MotionBox
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
        >
          <Heading mb={8}>Hej!</Heading>
          <Select
            w={200}
            placeholder="Välj person"
            onChange={(e) => onChangeSelectedPerson(e.target.value)}
            value={selectedPersonId}
          >
            {persons?.map((person) => (
              <option value={person._id} key={person._id}>
                {person.name}
              </option>
            ))}
          </Select>
        </MotionBox>
      </Flex>
    </Container>
  );
};

export default SelectPerson;

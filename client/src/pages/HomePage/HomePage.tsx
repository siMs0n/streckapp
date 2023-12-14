import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import usePinAuth from '../../hooks/usePinAuth';
import SelectPerson from './SelectPerson';
import ProductsTab from './ProductsTab';
import PaymentTab from './PaymentTab';
import usePersons from '../../hooks/usePersons';
import InstanceHeader from '../../components/InstanceHeader';
import { FetchingDataSpinner } from '../../components/FetchingDataSpinner';
import { useShowSpinner } from '../../hooks/useShowSpinner';

export default function HomePage() {
  const { isLoading: authIsLoading } = usePinAuth();
  const [selectedPersonId, setSelectedPersonId] = useState<string>(
    localStorage.getItem('selectedPersonId') || '',
  );
  const [tabIndex, setTabIndex] = useState(0);

  const { persons, personsLoading } = usePersons();

  const showSpinner = useShowSpinner(!!persons);

  const onChangeSelectedPerson = (personId: string) => {
    setSelectedPersonId(personId);
    localStorage.setItem('selectedPersonId', personId);
  };

  const selectedPerson = useMemo(
    () => persons?.find((p) => p._id === selectedPersonId),
    [selectedPersonId, persons],
  );

  if (showSpinner || authIsLoading) {
    return <FetchingDataSpinner />;
  }

  if (!selectedPerson && !personsLoading) {
    return (
      <SelectPerson
        persons={persons || []}
        selectedPersonId={selectedPersonId}
        onChangeSelectedPerson={onChangeSelectedPerson}
      />
    );
  }

  return (
    <Container centerContent maxW={600}>
      <InstanceHeader />
      <Flex w="100%" py={2} alignItems="center">
        <Select
          w={200}
          maxW="60%"
          placeholder="Välj person"
          onChange={(e) => onChangeSelectedPerson(e.target.value)}
          value={selectedPersonId}
        >
          {persons
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((person) => (
              <option value={person._id} key={person._id}>
                {person.name}
              </option>
            ))}
        </Select>
        <Spacer />
        <Box>
          {selectedPerson && <Text>Saldo: {selectedPerson.balance} kr</Text>}
        </Box>
      </Flex>
      <Text mt={8}>{tabIndex === 0 ? 'Streckar på:' : 'Plussar på:'}</Text>
      <Heading as="h1" size="2xl" mt={4} mb={10}>
        {selectedPerson?.name}
      </Heading>
      <Tabs
        variant="unstyled"
        size="lg"
        align="center"
        onChange={(index) => setTabIndex(index)}
      >
        <TabPanels>
          <TabPanel>
            <ProductsTab selectedPersonId={selectedPersonId} />
          </TabPanel>
          <TabPanel>
            <PaymentTab selectedPerson={selectedPerson} />
          </TabPanel>
        </TabPanels>
        <TabList
          position="fixed"
          bottom={0}
          left="50%"
          transform="translateX(-50%)"
          w="100%"
          maxWidth={600}
        >
          <Tab
            w="50%"
            _selected={{ color: 'white', bg: 'purple.800' }}
            bg="gray.700"
          >
            Strecka
          </Tab>
          <Tab
            w="50%"
            _selected={{ color: 'white', bg: 'purple.800' }}
            bg="gray.700"
          >
            Plussa
          </Tab>
        </TabList>
      </Tabs>
    </Container>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Select,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import usePinAuth from '../hooks/usePinAuth';
import SelectPerson from '../components/home/SelectPerson';
import ProductsTab from '../components/home/ProductsTab';
import PaymentTab from '../components/home/PaymentTab';
import usePersons from '../hooks/usePersons';
import useProducts from '../hooks/useProducts';
import InstanceHeader from '../components/InstanceHeader';

let loadingTimeout: NodeJS.Timeout;

export default function HomePage() {
  const { isLoading: authIsLoading } = usePinAuth();
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string>(
    localStorage.getItem('selectedPersonId') || '',
  );
  const [tabIndex, setTabIndex] = useState(0);

  const { products } = useProducts();
  const { persons } = usePersons();

  //Show spinner if server is cold starting and takes extra long to load
  useEffect(() => {
    if (!persons) {
      loadingTimeout = setTimeout(() => {
        if (!persons) {
          setShowSpinner(true);
        }
      }, 1000);
    } else if (persons) {
      clearTimeout(loadingTimeout);
      setShowSpinner(false);
    }
  }, [persons, showSpinner]);

  const onChangeSelectedPerson = (personId: string) => {
    setSelectedPersonId(personId);
    localStorage.setItem('selectedPersonId', personId);
  };

  const selectedPerson = useMemo(
    () => persons?.find((p) => p._id === selectedPersonId),
    [selectedPersonId, persons],
  );

  if (showSpinner || authIsLoading) {
    return (
      <Container centerContent>
        <Flex flexDirection="column" alignItems="center" mt={8}>
          <Text>Hämtar data...</Text>
          <Spinner mt={8} size="xl" />
        </Flex>
      </Container>
    );
  }

  if (!selectedPerson) {
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
            <ProductsTab
              products={products}
              selectedPersonId={selectedPersonId}
            />
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

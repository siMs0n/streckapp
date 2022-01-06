import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';
import AdminMenu from '../../components/AdminMenu';
import DeletePopover from '../../components/DeletePopover';
import usePersons from '../../hooks/usePersons';
import { Person } from '../../types';
import Papa from 'papaparse';
import dayjs from 'dayjs';

export default function PersonsPage() {
  const [newPersonName, setNewPersonName] = useState('');
  const [personToEdit, setPersonToEdit] = useState<Person>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { persons, addPerson, updatePerson, deletePerson } = usePersons();

  const onAddPerson = () => {
    if (newPersonName) {
      addPerson(newPersonName);
      setNewPersonName('');
    }
  };

  const onDeletePerson = (personId: string) => {
    deletePerson(personId);
  };

  const onUpdatePerson = (updatedPerson: Person) => {
    updatePerson(updatedPerson);
    onCloseUpdateModal();
  };

  const onCloseUpdateModal = () => {
    setPersonToEdit(undefined);
    onClose();
  };

  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Användare
        </Heading>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'auto', md: 200 }}>
            <AdminMenu />
          </Box>
          <Box mr={{ base: 0, md: 8 }}>
            <Box borderWidth="1px" borderRadius="lg" p={{ base: 1, md: 4 }}>
              <Table
                variant="simple"
                colorScheme="purple"
                w={{ base: 'auto', md: '600px' }}
                size={tableSize}
              >
                <Thead>
                  <Tr>
                    <Th>Namn</Th>
                    <Th>Saldo</Th>
                    <Th>Redigera / Ta bort</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {persons?.map((person) => (
                    <Tr key={person._id}>
                      <Td>{person.name}</Td>
                      <Td>{person.balance} kr</Td>
                      <Td>
                        <IconButton
                          aria-label="Redigera"
                          icon={<EditIcon />}
                          mr={{ base: 1, md: 4 }}
                          onClick={() => {
                            setPersonToEdit(person);
                            onOpen();
                          }}
                        />
                        <DeletePopover
                          name={person.name}
                          onDelete={() => onDeletePerson(person._id)}
                        >
                          <IconButton
                            aria-label="Ta bort"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                          />
                        </DeletePopover>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
          <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            mt={{ base: 8, md: 0 }}
            p={{ base: 2, md: 4 }}
          >
            <Heading size="md">Lägg till ny användare</Heading>
            <Input
              placeholder="Namn"
              my={8}
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
            ></Input>
            <Button
              rightIcon={<AddIcon />}
              colorScheme="green"
              onClick={onAddPerson}
            >
              Lägg till
            </Button>
          </Box>
        </Flex>
        {personToEdit && (
          <EditPersonModal
            person={personToEdit}
            isOpen={isOpen}
            onClose={onCloseUpdateModal}
            onSave={onUpdatePerson}
          />
        )}
      </Flex>
      <Button onClick={() => exportPersonsToCsv(persons)}>
        Exportera saldon
      </Button>
    </Container>
  );
}

type EditPersonModalProps = {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: Person) => void;
};

const EditPersonModal = ({
  person,
  isOpen,
  onClose,
  onSave,
}: EditPersonModalProps) => {
  const [name, setName] = useState(person.name);
  const [balanceText, setBalanceText] = useState(person.balance + '');
  const toast = useToast();
  const savePerson = () => {
    if (name && !isNaN(parseInt(balanceText))) {
      onSave({ ...person, name, balance: parseInt(balanceText) });
    } else {
      toast({
        description: 'Något gick fel',
        status: 'error',
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Redigera "{person.name}"</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mt={4}>Namn</Text>
          <Input
            placeholder="Namn"
            mt={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Text mt={4}>Saldo</Text>
          <Input
            placeholder="Saldo"
            mt={2}
            mb={8}
            value={balanceText}
            onChange={(e) => setBalanceText(e.target.value)}
          ></Input>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Avbryt
          </Button>
          <Button colorScheme="green" onClick={savePerson}>
            Spara
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const exportPersonsToCsv = (persons?: Person[]) => {
  if (!persons) {
    return;
  }
  const csv = Papa.unparse(
    persons.map((p) => ({ Namn: p.name, Saldo: p.balance })),
  );
  const blob = new Blob([csv], { type: 'text/plain' });

  // @ts-ignore
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    // @ts-ignore
    window.navigator.msSaveBlob(blob, args.filename);
  else {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `Saldoexport ${dayjs(new Date()).format(
      'YYYY-MM-DD HH:mm',
    )}.csv`;
    document.body.appendChild(a);
    a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
  }
};

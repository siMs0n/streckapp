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
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';
import AdminMenu from '../../components/AdminMenu';
import DeletePopover from '../../components/DeletePopover';
import usePersons from '../../hooks/usePersons';
import { Person } from '../../types';

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

  return (
    <Container paddingTop="50px" pl={8} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt="100px" flexDirection="column">
        <Heading mb={4} ml="200px">
          Användare
        </Heading>
        <Flex>
          <Box w={200}>
            <AdminMenu />
          </Box>
          <Box mr={8}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Table variant="simple" colorScheme="purple" w={600}>
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
                          mr={3}
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
          <Box maxW="md" borderWidth="1px" borderRadius="lg" p={4}>
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
          <Input
            placeholder="Namn"
            my={8}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            placeholder="Saldo"
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

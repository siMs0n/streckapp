import React from 'react';
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

type DeletePopoverProps = {
  name: string;
  onDelete: () => any;
};

const DeletePopover: React.FC<DeletePopoverProps> = ({
  name,
  onDelete,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>Är du säker på att du vill ta bort "{name}"?</PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button onClick={onClose}>Avbryt</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                onDelete();
              }}
            >
              Ja
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePopover;

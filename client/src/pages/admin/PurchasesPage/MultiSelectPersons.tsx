import { Checkbox, Grid, GridItem } from '@chakra-ui/react';
import { Person } from '../../../types';

interface MultiSelectPersonsProps {
  persons: Person[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}

const MultiSelectPersons = ({
  persons,
  selectedIds,
  setSelectedIds,
}: MultiSelectPersonsProps) => {
  const allChecked = selectedIds.length === persons.length;
  const isIndeterminate = selectedIds.length > 0 && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          e.target.checked
            ? setSelectedIds(persons.map((p) => p._id))
            : setSelectedIds([])
        }
      >
        Alla
      </Checkbox>
      <Grid pl={6} templateColumns="repeat(2, 1fr)" gap={2}>
        {persons.map((person) => (
          <GridItem mr={2}>
            <Checkbox
              key={person._id}
              isChecked={Boolean(selectedIds.includes(person._id))}
              onChange={(e) =>
                e.target.checked
                  ? setSelectedIds([...selectedIds, person._id])
                  : setSelectedIds(selectedIds.filter((p) => p !== person._id))
              }
            >
              {person.name}
            </Checkbox>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default MultiSelectPersons;

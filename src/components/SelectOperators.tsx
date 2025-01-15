import { Checkbox, Group, rem } from '@mantine/core';
import { OPERATORS, humanReadableSign } from '../constants/operators';

interface SelectOperatorsProps {
  operatorsSelected: string[];
  onOperatorsChanged: (operators: string[]) => void;
}

const SelectOperators = (props: SelectOperatorsProps) => {
  const { operatorsSelected, onOperatorsChanged } = props;

  return (
    <Group m={rem(5)}>
      {Object.values(OPERATORS).map((operator) => {
        const isChecked = operatorsSelected.includes(operator);
        return (
          <Checkbox
            mx={rem(3)}
            key={operator}
            label={humanReadableSign(operator)}
            size="lg"
            color={'black'}
            value={operator}
            fw={600}
            checked={isChecked}
            onChange={() => {
              if (isChecked) {
                // remove from selected operators list
                onOperatorsChanged(operatorsSelected.filter((op) => op !== operator));
              } else {
                // add to list
                onOperatorsChanged([...new Set([...operatorsSelected, operator])]);
              }
            }}
          />
        );
      })}
    </Group>
  );
};

export default SelectOperators;

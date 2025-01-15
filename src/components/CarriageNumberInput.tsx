import { useState } from 'react';
import { PinInput } from '@mantine/core';

interface CarriageNumberInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  numbers: string;
  onNumbersChange: (numbers: string) => void;
}

const CarriageNumberInput = (props: CarriageNumberInputProps) => {
  const [carriageNumbers] = useState('');

  return (
    <>
      <PinInput
        ref={props.inputRef}
        autoFocus
        type="number"
        inputMode="numeric"
        oneTimeCode={false}
        size="xl"
        gap="xs"
        placeholder=""
        getInputProps={(index: number) => {
          if (carriageNumbers.length == 0) {
            return { placeholder: `${index + 1}` };
          }
          return {};
        }}
        value={props.numbers}
        onChange={(v) => props.onNumbersChange(v)}
      />
    </>
  );
};

export default CarriageNumberInput;

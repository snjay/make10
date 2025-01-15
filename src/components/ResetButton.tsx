import { Button } from '@mantine/core';
import { MouseEventHandler } from 'react';

interface ResetButtonProps {
  disabled: boolean;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = (props: ResetButtonProps) => {
  const { disabled, onClickReset } = props;

  return (
    <Button disabled={disabled} size="sm" variant="outline" color="black" onClick={onClickReset}>
      Reset
    </Button>
  );
};

export default ResetButton;

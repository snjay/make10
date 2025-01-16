import { useState, useRef } from 'react';
import { Button, Center, Container, Group, NumberInput, Paper, Stack, Text, Title, rem } from '@mantine/core';

import Make10Solver from '../services/make-10-solver';

import CarriageNumberInput from '../components/CarriageNumberInput';
import SelectOperators from '../components/SelectOperators';
import ResetButton from '../components/ResetButton';
import Solution from '../components/Solution';
import NoSolutionsFound from '../components/NoSolutionsFound';

import { COLOURS } from '../constants/colours';
import { OPERATORS, humanReadableSign } from '../constants/operators';
import { DEFAULT_GOAL } from '../constants/numbers';

export default function Make10() {
  const [numbers, setNumbers] = useState('');
  const [goal, setGoal] = useState(`${DEFAULT_GOAL}`);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [solutionIdx, setSolutionIdx] = useState<number | null>(null);
  const [operators, setOperators] = useState<string[]>(Object.values(OPERATORS));

  const [showOperators, setShowOperators] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  const numsRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);
  const solutionsRef = useRef<HTMLInputElement>(null);

  const GREEN_GRADIENT = { from: COLOURS.FERRY_GREEN, to: 'lime.5', deg: 230 };
  const ORANGE_GRADIENT = { from: COLOURS.TRAIN_ORANGE, to: 'orange.8', deg: 230 };
  const DEFAULT_SCROLL_BEHAVIOUR: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' };

  const findSolutions = () => {
    const inputNumbers = numbers.split('').map((n) => `${parseInt(n, 10)}`);
    const solver = new Make10Solver(inputNumbers, parseInt(goal), operators);
    const solutions = solver.getSolutions();
    const formattedSolutions = formatSolutions(sortSolutions(solutions));
    setSolutions(formattedSolutions);
    setSolutionIdx(solutions.length > 0 ? 0 : null);
    setShowSolutions(true);
    scrollIntoView(solutionsRef);
  };

  const sortSolutions = (solutions: string[]): string[] => {
    // show simple solutions first
    return solutions.sort((a, b) => {
      const aHasBracket = /[\(\)]/.test(a);
      const bHasBracket = /[\(\)]/.test(b);
      if (aHasBracket && !bHasBracket) {
        return 1;
      }
      if (bHasBracket && !aHasBracket) {
        return -1;
      }
      return a.localeCompare(b);
    });
  };

  const formatSolutions = (solutions: string[]): string[] => solutions.map((solution) => humanReadableSign(solution));

  const nextSolution = () => {
    scrollIntoView(solutionsRef);
    setSolutionIdx(((solutionIdx || 0) + 1) % solutions.length);
  };

  const scrollIntoView = (ref: React.RefObject<HTMLInputElement>): void => {
    setTimeout(() => ref.current?.scrollIntoView(DEFAULT_SCROLL_BEHAVIOUR), 0);
  };

  const clearSolutions = () => {
    setSolutions([]);
    setSolutionIdx(null);
    setShowSolutions(false);
  };

  const resetForm = () => {
    setNumbers('');
    setGoal('10');
    setOperators(Object.values(OPERATORS));
    setShowSolutions(false);
    setShowOperators(false);
    clearSolutions();
    numsRef.current?.focus();
  };

  const solutionsExist = solutions.length > 0 && (!!solutionIdx || solutionIdx === 0);
  const validInputs = numbers.length === 4 && goal.length > 0;
  const formChanged = numbers.length > 0 || (goal !== '10' && goal.length > 0) || operators.length !== 4;

  return (
    <Paper radius="md" p="xl" shadow="lg" withBorder mr="auto" ml="auto" my={rem(15)} maw={rem(1000)}>
      <Center>
        <Title>make 🔟</Title>
      </Center>
      <Group justify="flex-end" m={rem(20)}>
        <Button variant="outline" size="sm" color="black" onClick={() => setShowOperators(!showOperators)}>
          {showOperators ? 'Hide operator settings' : 'Select operators'}
        </Button>
        <ResetButton
          disabled={!formChanged}
          onClickReset={(e) => {
            e.preventDefault();
            resetForm();
          }}
        />
      </Group>

      {showOperators && (
        <Center>
          <SelectOperators
            operatorsSelected={operators}
            onOperatorsChanged={(operatorsSelected) => {
              clearSolutions();
              setOperators(operatorsSelected);
            }}
          />
        </Center>
      )}

      <Center m={rem(20)}>
        <Text size="lg" fw={500}>
          Enter in train carriage's 4 digit numbers (e.g. 1 2 3 4) and a target number (e.g. 10)
        </Text>
      </Center>

      <Center m={rem(20)}>
        <Stack w={rem(275)}>
          <Text fw={700}>Carriage number ✍️</Text>
          <CarriageNumberInput
            inputRef={numsRef}
            numbers={numbers}
            onNumbersChange={(v) => {
              clearSolutions();
              setNumbers(v);
              if (v.length === 4) {
                goalRef.current?.focus();
              }
            }}
          />
        </Stack>
      </Center>

      <Center mb={rem(20)}>
        <Stack w={rem(275)}>
          <Text fw={700}>Target 🎯</Text>
          <NumberInput
            ref={goalRef}
            size="xl"
            placeholder="e.g. 10 or 24"
            hideControls={true}
            allowNegative={false}
            allowDecimal={false}
            value={goal}
            onChange={(v) => {
              clearSolutions();
              setGoal(`${v}`);
            }}
          />
        </Stack>
      </Center>

      <Center mt={rem(30)}>
        <Button
          disabled={!validInputs || (showSolutions && !solutionsExist)}
          size="xl"
          fullWidth
          variant="gradient"
          gradient={solutionsExist ? GREEN_GRADIENT : ORANGE_GRADIENT}
          onClick={(e) => {
            e.preventDefault();
            solutionsExist ? nextSolution() : findSolutions();
          }}
        >
          {solutionsExist ? 'Another solution?' : 'Find solutions'}{' '}
        </Button>
      </Center>

      <Container ref={solutionsRef}>
        {showSolutions &&
          (solutionsExist ? (
            <Solution
              solution={solutions[solutionIdx]}
              solutionIdx={solutionIdx}
              totalSolutions={solutions.length}
              goal={goal}
            />
          ) : (
            <NoSolutionsFound />
          ))}
      </Container>
    </Paper>
  );
}

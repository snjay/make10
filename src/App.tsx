import { useState, useRef } from 'react';
import { Button, Center, Title, Text, Paper, Stack, NumberInput, rem, Container, Group } from '@mantine/core';
import CarriageNumberInput from './components/CarriageNumberInput';
import Make10Solver from './services/make-10-solver';
import { OPERATORS } from './constants/operators';
import Solution from './components/Solution';
import ResetButton from './components/ResetButton';
import SelectOperators from './components/SelectOperators';
import { COLOURS } from './constants/colours';
import Footer from './components/Footer';

function App() {
  const [numbers, setNumbers] = useState('');
  const [goal, setGoal] = useState('10');
  const [solutions, setSolutions] = useState<string[]>([]);
  const [operators, setOperators] = useState<string[]>(Object.values(OPERATORS));
  const [solutionIdx, setSolutionIdx] = useState<number | null>(null);
  const [showOperators, setShowOperators] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  const numsRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);
  const solutionsRef = useRef<HTMLInputElement>(null);

  const findSolutions = () => {
    const inputNumbers = numbers.split('').map((n) => `${parseInt(n, 10)}`);
    const solver = new Make10Solver(inputNumbers, parseInt(goal), operators);
    const solutions = solver.getSolutions();
    setSolutions(sortSolutions(solutions));
    setSolutionIdx(solutions.length > 0 ? 0 : null);
    setShowSolutions(true);
    setTimeout(() => solutionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const sortSolutions = (solutions: string[]): string[] => {
    // show simple solutions first
    const sortedSolutions = solutions.sort((a, b) => {
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

    return sortedSolutions.map((solution) => solution.replaceAll('*', '×').replaceAll('/', '÷').replaceAll('-', '–'));
  };

  const nextSolution = () => {
    setTimeout(() => solutionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    setSolutionIdx(((solutionIdx || 0) + 1) % solutions.length);
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

  const greenGradient = { from: COLOURS.FERRY_GREEN, to: 'lime.5', deg: 230 };
  const orangeGradient = { from: COLOURS.TRAIN_ORANGE, to: 'orange.8', deg: 230 };

  const solutionsExist = solutions.length > 0 && (!!solutionIdx || solutionIdx === 0);
  const validInputs = numbers.length === 4 && goal.length > 0;
  const formChanged = numbers.length > 0 || (goal !== '10' && goal.length > 0) || operators.length !== 4;

  return (
    <>
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
            gradient={solutionsExist ? greenGradient : orangeGradient}
            onClick={(e) => {
              e.preventDefault();
              solutionsExist ? nextSolution() : findSolutions();
            }}
          >
            {solutionsExist ? 'Another solution?' : 'Find solutions'}
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
              <Center>
                <Paper mx={rem(15)} my={rem(40)} px={rem(40)} py={rem(30)} shadow="xl" withBorder>
                  <Center m={rem(10)}>
                    <Title>😔</Title>
                  </Center>
                  <Title order={4} fw={300}>
                    {'No solutions found'}
                  </Title>
                </Paper>
              </Center>
            ))}
        </Container>
      </Paper>

      <Footer />
    </>
  );
}

export default App;

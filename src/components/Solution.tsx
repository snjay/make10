import { Center, Title, Text, Paper, rem } from '@mantine/core';

interface SolutionProps {
  solution: string;
  solutionIdx: number | null;
  totalSolutions: number;
  goal: string;
}

const Solution = (props: SolutionProps) => {
  const { solutionIdx, solution, goal, totalSolutions } = props;

  return (
    <>
      <Center my={rem(30)}>
        <Paper shadow="xs" p={rem(30)} withBorder>
          {(!!solutionIdx || solutionIdx === 0) && (
            <Title>
              <Center>
                <span style={{ letterSpacing: rem(2.75), whiteSpace: 'nowrap' }}>{solution}</span>{' '}
                <span style={{ paddingLeft: rem(30), color: '#797979', whiteSpace: 'nowrap' }}>= {goal}</span>
              </Center>
            </Title>
          )}
        </Paper>
      </Center>
      <Center mb={rem(20)}>
        <Text size="lg">
          Solution #{(solutionIdx || 0) + 1} out of {totalSolutions} possible solutions
        </Text>
      </Center>
      <Center mt={rem(20)}>
        <Text size="lg">Click 'Another solution' for more solutions.</Text>
      </Center>
    </>
  );
};

export default Solution;

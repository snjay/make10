import { Center, Paper, Title, rem } from '@mantine/core';

const NoSolutionsFound = () => {
  return (
    <Center>
      <Paper mx={rem(15)} my={rem(40)} px={rem(40)} py={rem(30)} shadow="xl" withBorder>
        <Center m={rem(10)}>
          <Title>😔</Title>
        </Center>
        <Title order={4} fw={300}>
          No solutions found
        </Title>
      </Paper>
    </Center>
  );
};

export default NoSolutionsFound;

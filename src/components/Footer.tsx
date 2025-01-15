import { Center, Container, Grid, Group } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const Footer = () => {
  return (
    <Container>
      <Grid>
        <Grid.Col span={4}>
          <Group align="center" justify="start">
            <small>
              <a target="_blank" rel="noopener noreferrer" href="https://sanjayn.com/make10/">
                How does it work?
              </a>
            </small>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/snjay/make10">
              <IconBrandGithub size={20} />
            </a>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group align="center" justify="end">
            <small>
              {`Made by `}
              <a target="_blank" rel="noopener noreferrer" href="https://sanjayn.com/">
                Sanjay
              </a>
            </small>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Footer;

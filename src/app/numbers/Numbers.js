import React, {Component} from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Label,
  Segment,
} from "semantic-ui-react";
import {
  operators,
  basicOperators,
  permutations,
  evaluate,
  operationsCombinations,
  postFix,
  postFixToInfix
} from '../utils/make10/numbersUtils';

export default class Numbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [],
      solutions: [],
      showSolutions: false,
      showSettings: false,
      allOperations: operators.reverse(),
      selectedOperations: [],
      solutionNumber: null,
    }
  }

  componentDidMount() {
    // const {allOperations} = this.state;
    this.setState({
      inputs: Array.from([1, 2, 3, 4], i => {
        return {id: i, value: ''}
      }),
      selectedOperations: basicOperators
    })
  }

  calculate = () => {
    this.setState({showSolutions: false});
    let {inputs, goal, selectedOperations} = this.state;
    let solutions = [];
    if (inputs.every(({value}) => value !== null) && goal) {
      let numberPermutations = permutations(inputs.map(({value}) => value));
      let operatorCombinations = operationsCombinations(selectedOperations.map(o => [o]), inputs.length - 1);
      for (let i = 0; i < numberPermutations.length; i++) {
        for (let j = 0; j < operatorCombinations.length; j++) {
          let expr = postFix(numberPermutations[i], operatorCombinations[j]);
          if (evaluate(expr) === goal) {
            solutions.push(expr);
          }
        }
      }
    }
    const solutionNumber = solutions.length > 0 ? 0 : null;
    this.setState({solutions, showSolutions: true, solutionNumber});
  };

  clear = () => {
    this.setState({
      goal: '',
      inputs: Array.from([1, 2, 3, 4], i => {
        return {id: i, value: ''}
      }),
      solutions: [],
      solutionNumber: null,
      showSolutions: false,
    });
  };

  nextSolution = () => {
    const {solutionNumber, solutions} = this.state;
    this.setState({
      solutionNumber: (solutionNumber + 1) % solutions.length
    })
  };

  render() {
    const {inputs, solutions, goal, showSolutions, solutionNumber, showSettings, selectedOperations} = this.state;
    const allInputsValid = inputs.every(({value}) => !isNaN(value)) && !isNaN(goal);
    const numOpsSufficient = selectedOperations.length >= 1;
    // const inputsInvalid = !allInputsValid;

    const solutionsExist = showSolutions && solutions && solutions.length > 0;

    const Settings = () => {
      const {allOperations} = this.state;
      const operationSelected = (o) => selectedOperations.indexOf(o) >= 0;
      const handleOperationClick = (o) => {
        if (operationSelected(o)) {
          // remove from list
          this.setState({
            selectedOperations: this.state.selectedOperations.filter(s => s !== o),
            showSolutions: false,
            solutions: []
          })
        } else {
          // add to list
          this.setState({
            selectedOperations: [...this.state.selectedOperations, o],
            showSolutions: false,
            solutions: []
          })
        }
      };
      const handleSelectClick = () => {
        this.setState({
          selectedOperations: allOperations.length !== selectedOperations.length ? allOperations : []
        })
      };

      if (showSettings) {
        return <Container>
          <Divider hidden/>
          <Form>
            <Form.Group inline>
              <label>Operations to use:</label>
              {allOperations.map(o =>
                <Form.Checkbox
                  key={o}
                  label={o}
                  checked={operationSelected(o)}
                  onChange={() => handleOperationClick(o)}/>
              )}
              <Form.Button
                style={{margin: 7}}
                basic
                compact
                size={'small'}
                content={allOperations.length !== selectedOperations.length ? 'Select all' : 'Unselect all'}
                onClick={handleSelectClick}/>
            </Form.Group>
          </Form>
        </Container>
      } else {
        return null;
      }
    };

    return (
      <Container style={{marginTop: 10}} text>
        <Segment padded>
          <Grid columns={3}>
            <Grid.Column textAlign={'left'} verticalAlign={'middle'}>
              {/*<Link style={{cursor: 'pointer', color: 'black'}} to={'/'}>*/}
              {/*  <Icon link name='chevron left'/> Back*/}
              {/*</Link>*/}
            </Grid.Column>
            <Grid.Column verticalAlign={'middle'} textAlign={'center'}>
              <Header as={'h1'}>
                Make 10
              </Header>
            </Grid.Column>
            <Grid.Column textAlign={'right'} verticalAlign={'middle'}>
              <Button
                basic
                onClick={() => this.setState({
                  showSettings: !this.state.showSettings
                })}>
                {showSettings ? 'Hide operator settings' : 'Select operators'}
              </Button>
            </Grid.Column>
          </Grid>
          <Divider hidden/>
          <Container textAlign={'center'}>
            <p>Enter in a 4-digit train carriage number and a goal number.</p>
          </Container>
          <Settings/>
          <Container textAlign={'right'}>
            <Form>
              <Form.Field
                basic
                control={Button}
                disabled={!allInputsValid}
                content={'Clear'}
                onClick={this.clear}/>
            </Form>
          </Container>
          <Form onSubmit={solutionsExist ? this.nextSolution : this.calculate}>
            <Form.Group widths='equal'>
              {inputs.map(({id, value}, i) =>
                <Form.Input
                  fluid
                  key={i}
                  type='number'
                  label={{children: i === 0 ? <label>Carriage number</label> : <label>&nbsp;</label>}}
                  autoFocus={i === 0}
                  placeholder={`Num #${id}`}
                  value={isNaN(value) ? '' : value}
                  onChange={(e, {value}) => {
                    if (value.length <= 1) {
                      let inputs = [...this.state.inputs];
                      inputs[i]['value'] = parseInt(value, 10);
                      this.setState({
                        inputs, solutions: [], showSolutions: false
                      })
                    }
                  }}
                />)}
              <Form.Input
                type='number'
                // label={'Goal'}
                label={{children: <label>Goal</label>}}
                placeholder={'e.g. 10 or 24'}
                value={isNaN(goal) ? '' : goal}
                onChange={(e, {value}) => this.setState({
                  goal: parseInt(value, 10),
                  solutions: [],
                  showSolutions: false
                })}/>
            </Form.Group>
            <Form.Field
              fluid
              type={'submit'}
              control={Button}
              disabled={!allInputsValid || !numOpsSufficient}
              content={allInputsValid && solutionsExist ? 'Another solution?' : 'Find solution'}
              positive/>
          </Form>
          {showSolutions && solutions ? <Container>
            <Divider hidden/>
            {solutions && solutions.length > 0 && !isNaN(solutionNumber) ?
              <Container text textAlign={'center'}>
                <Label basic size={'massive'}>
                  {postFixToInfix(solutions[solutionNumber])}
                  <Label.Detail>
                    = {goal}
                  </Label.Detail>
                </Label>
              </Container>
              : null}
            {solutions.length === 0 ? <Container textAlign={'center'}>
              <Divider hidden/>
              <p>No solutions found :(</p>
            </Container> : null}
          </Container> : null}
        </Segment>
      </Container>
    )
  }
}

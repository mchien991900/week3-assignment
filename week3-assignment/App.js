import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {
  GameStatus,
  BattleGround,
  PlayerDecision
} from './components/index';
import { CHOICES } from './components/Constants';
import { randomComputerChoice, getRoundOutcome } from './components/Logic';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerChoice : {},
      computerChoice: {},
      result: '',
    }
  }
  onPressButton = playerChoice => {
    const found = CHOICES.find(choice => choice.name === playerChoice)
    const computerChoice = randomComputerChoice();
    const result = getRoundOutcome(found.name, computerChoice.name);
    this.setState({
      playerChoice: found,
      computerChoice,
      result
    });
  }; 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.GameStatusWrapper}>
          <GameStatus Result = {this.state.result}/>
        </View>
        <View style={styles.BattleGroundWrapper}>
          <BattleGround playerName="Player" choice={this.state.playerChoice}/>
          <Text>Vs</Text>
          <BattleGround playerName="Computer" choice={this.state.computerChoice} />
        </View>
        <View style={styles.PlayerDecisionWrapper}>
          <PlayerDecision onPressButton={this.onPressButton} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  GameStatusWrapper: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BattleGroundWrapper: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlayerDecisionWrapper: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard, Picker,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Dive from '../models/dive';

const LookUpScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [execution, setExecution] = useState('A');
  const [height, setHeight] = useState(1);
  const [searchedDive, setSearchedDive] = useState(new Dive("-1", "", "0.0", ""));

  const dives = useSelector(state => state.dives.dives);

  const numberInputHandler = inputText => {
    input = inputText.replace(/[^0-9]/g, '');
    setEnteredValue(input);
    sDive = dives.filter((dive) => dive.id === input)[0];
    setSearchedDive(sDive ? sDive : new Dive("-1", "", "0.0", ""));
  };

  const getExecutionName = () => {
    switch (execution) {
      case 'A': return "gestreckt";
      case 'B': return "gehechtet";
      case 'C': return "gehockt";
      case 'D': return "Ausführung freigestellt";
    }
  }

  const getSKG = () => {
    console.log(searchedDive.skg);
    var skg = JSON.parse(searchedDive.skg);
    return skg[execution.toString()][height.toString()];
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <StatusBar hidden={true} />
        <View style={styles.inputContainer}>
          <View>
            <Text>Sprungnummer:</Text>
            <View style={styles.inputDive}>
              <TextInput style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={numberInputHandler}
                value={enteredValue} />
              <Picker
                style={{ height: 50, width: 80 }}
                selectedValue={execution}
                onValueChange={(itemValue, itemIndex) =>
                  setExecution(itemValue)
                }>
                <Picker.Item label="A" value='A' />
                <Picker.Item label="B" value='B' />
                <Picker.Item label="C" value='C' />
                <Picker.Item label="D" value='D' />
              </Picker>
            </View>
          </View>
          <View>
            <Text>Höhe:</Text>
            <Picker
              style={{ height: 50, width: 100 }}
              selectedValue={height}
              onValueChange={(itemValue, itemIndex) =>
                setHeight(itemValue)
              }>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="7.5" value={7} />
              <Picker.Item label="10" value={10} />
            </Picker>
          </View>
        </View>
        <View style={styles.dive}>
          <Text>{searchedDive.name} {searchedDive.id !== "-1" ? getExecutionName() : ""}</Text>
          <Text>{searchedDive.id !== "-1" ? "SKG: " + getSKG() : ""}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  input: {
    height: 30,
    width: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: 'right'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  inputDive: {
    flexDirection: 'row'
  },
  dive: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default LookUpScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard, Picker,
  Platform
} from 'react-native';
import DiveView from '../components/DiveView';
import Colors from '../assets/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const LookUpScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [execution, setExecution] = useState('B');
  const [height, setHeight] = useState(1);

  const numberInputHandler = inputText => {
    input = inputText.replace(/[^0-9]/g, '');
    setEnteredValue(input);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.text}>Sprungnummer:</Text>
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
                style={styles.inputPicker}
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
            <Text style={styles.text} >Höhe:</Text>
            <Picker
              style={styles.inputPicker}
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
        <DiveView style={{ marginTop: 20 }} id={enteredValue} ex={execution} height={height} showBoxAlways={false} />
      </View>
    </TouchableWithoutFeedback>
  );
};

LookUpScreen.navigationOptions = navData => {
  return {  
    headerTitle: <Text style={{fontSize: 22, fontWeight: 'bold', width: '100%'}}>Sprungnamen finden</Text>,
    headerLeft: (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            )
          };
  };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  input: {
    height: 30,
    width: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: 'right',
    color: Colors.text,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    color: Colors.text,
  },
  inputDive: {
    flexDirection: 'row',
    color: Colors.text,
  },
  dive: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Colors.text,
  },
  inputPicker: {
    width: 100,
    height: 50,
    color: Colors.text,
  },
  text: {
    color: Colors.text
  }
});

export default LookUpScreen;

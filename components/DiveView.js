import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const DiveView = props => {
  const dives = useSelector(state => state.dives.dives);
  const dive = dives.filter((dive) => dive.id === props.id)[0];
  if (!dive) {
    if (props.showBoxAlways) {
      return (
        <View style={[styles.dive, props.style]}>
          <Text style={styles.textNumber}>{'' + props.id + props.ex}</Text>
          <Text style={styles.text}>Unbekannter Sprung</Text>
        </View>
      )
    } else {
      return <Text style={styles.text}>Unbekannter Sprung</Text>
    }
  }

  console.log(Dimensions.get('window').width);

  const getExecutionName = () => {
    switch (props.ex) {
      case 'A': return "gestreckt";
      case 'B': return "gehechtet";
      case 'C': return "gehockt";
      case 'D': return "Ausführung freigestellt";
    }
  }

  const getSKG = () => {
    var skg = JSON.parse(dive.skg);
    return skg[props.ex.toString()][props.height.toString()];
  }

  return (
    <View style={[styles.dive, props.style]}>
      <Text style={styles.textNumber}>{'' + dive.id + props.ex}</Text>
      <Text style={styles.text}>{dive.name} {dive.id !== "-1" ? getExecutionName() : ""}</Text>
      <Text style={styles.text}>{dive.id !== "-1" ? "SKG: " + getSKG() : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').width * 0.8 - 20) / 4,
    borderColor: '#e8e3e3',
  },
  textNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    color: '#e8e3e3'
  },
  text: {
    textAlign: 'center',
    color: '#e8e3e3'
  }
});

export default DiveView;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Dive from '../models/dive';

const DiveView = props => {
  const getExecutionName = () => {
    switch (execution) {
      case 'A': return "gestreckt";
      case 'B': return "gehechtet";
      case 'C': return "gehockt";
      case 'D': return "Ausführung freigestellt";
    }
  }

  const getSKG = (dive, execution, height) => {
    console.log(dive.skg);
    var skg = JSON.parse(dive.skg);
    return skg[execution.toString()][height.toString()];
  }

console.log(props.id);

  return (
   <View style={styles.container}>
       <Text>SKG:</Text>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

export default DiveView;

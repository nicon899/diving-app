import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../assets/Colors';
import AnimatedView from '../components/AnimatedView';

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
    <View style={props.animation ? [styles.diveViewContainer, props.style] : props.style}>
      <View style={styles.dive} >
        <Text style={styles.textNumber}>{'' + dive.id + props.ex}</Text>
        <Text style={styles.text}>{dive.name} {dive.id !== "-1" ? getExecutionName() : ""}</Text>
        <Text style={styles.text}>{dive.id !== "-1" ? "SKG: " + getSKG() : ""}</Text>
      </View>
      {props.animation &&
        <View style={styles.animationContainer}>
          <AnimatedView
            style={{
              flex: 1,
              width: '100%',
            }}
            xrotation={parseInt(dive.id.charAt(2))}
            invard={[3, 4].includes(parseInt(dive.id.charAt(0))) || ([5, 6].includes(parseInt(dive.id.charAt(0))) && ([3, 4].includes(parseInt(dive.id.charAt(1)))))}
            handstand={parseInt(dive.id.charAt(0)) === 6}
            spins={parseInt(dive.id.charAt(0)) === 5 || (parseInt(dive.id.charAt(0)) === 6 && dive.id.length === 4) ? parseInt(dive.id.charAt(3)) : 0}
            directionForward={[1, 3].includes(parseInt(dive.id.charAt(0))) || ([5, 6].includes(parseInt(dive.id.charAt(0))) && ([1, 3].includes(parseInt(dive.id.charAt(1)))))}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  diveViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%'
  },
  dive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').width * 0.8 - 20) / 4,
    borderColor: Colors.text,
  },
  textNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    color: Colors.text
  },
  text: {
    textAlign: 'center',
    color: Colors.text
  },
  animationContainer: {
    height: '50%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default DiveView;

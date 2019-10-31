import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Picker,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Dive from '../models/dive';
import DiveView from '../components/DiveView';

const FindeNumberScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [execution, setExecution] = useState('A');
    const [height, setHeight] = useState(1);
    const [searchedDive, setSearchedDive] = useState(new Dive("-1", "", "0.0", ""));
    const [group, setGroup] = useState(1);
    const [secondGroup, setSecondGroup] = useState(1);
    const [handGroup, setHandGroup] = useState(1);
    const [salti, setSalti] = useState(0);
    const [spins, setSpins] = useState(1);
    const [isSpin, setIsSpin] = useState(false);


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

    let spinInput;
    if (group === 5 || isSpin) {
        spinInput =
            <View style={styles.line}>
                <Text>Schrauben: </Text>
                <Picker
                    style={{ height: 50, width: 100 }}
                    selectedValue={spins}
                    onValueChange={(itemValue, itemIndex) =>
                        setSpins(itemValue)
                    }>
                    <Picker.Item label="0.5" value={1} />
                    <Picker.Item label="1" value={2} />
                    <Picker.Item label="1.5" value={3} />
                    <Picker.Item label="2" value={4} />
                    <Picker.Item label="2.5" value={5} />
                    <Picker.Item label="3" value={6} />
                    <Picker.Item label="3.5" value={7} />
                    <Picker.Item label="4" value={8} />
                    <Picker.Item label="4.5" value={9} />
                </Picker>
            </View>
    }

    let spingroupPicker;
    if (group === 5) {
        spingroupPicker = <View style={styles.centeredLine}>
            <Picker
                style={{ height: 50, width: 150 }}
                selectedValue={secondGroup}
                onValueChange={(itemValue, itemIndex) =>
                    setSecondGroup(itemValue)
                }>
                <Picker.Item label="Vorwärts" value={1} />
                <Picker.Item label="Rückwärts" value={2} />
                <Picker.Item label="Auerbach" value={3} />
                <Picker.Item label="Delphin" value={4} />
            </Picker></View>;
    } else if (group === 6) {
        spingroupPicker = <View style={styles.centeredLine}>
            <Picker
                style={{ height: 50, width: 150 }}
                selectedValue={handGroup}
                onValueChange={(itemValue, itemIndex) => {
                    setHandGroup(itemValue);
                    if (itemValue <= 3) {
                        setSecondGroup(itemValue);
                        setIsSpin(false);
                    } else {
                        setSecondGroup(itemValue-3);
                        setIsSpin(true);
                    }
                }
                }>
                <Picker.Item label="Vorwärts" value={1} />
                <Picker.Item label="Rückwärts" value={2} />
                <Picker.Item label="Auerbach" value={3} />
                <Picker.Item label="Vorwärts - Schraube" value={4} />
                <Picker.Item label="Rückwärts - Schraube" value={5} />
                <Picker.Item label="Auerbach - Schraube" value={6} />
            </Picker>
        </View>;
    }


    const diveNmb = ''
        + group
        + ((group === 5 || group === 6) ? secondGroup : '0')
        + ((group === 5 || (group === 6 && isSpin)) ? spins : '')
        + salti + execution;

    return (
        <View style={styles.screen}>
            <StatusBar hidden={true} />

            <View style={styles.line}>
                <Text>Gruppe: </Text>
                <Picker
                    style={{ height: 50, width: 175 }}
                    selectedValue={group}
                    onValueChange={(itemValue, itemIndex) =>
                        setGroup(itemValue)
                    }>
                    <Picker.Item label="Vorwärts" value={1} />
                    <Picker.Item label="Rückwärts" value={2} />
                    <Picker.Item label="Auerbach" value={3} />
                    <Picker.Item label="Delphin" value={4} />
                    <Picker.Item label="Schraube" value={5} />
                    <Picker.Item label="Handstand" value={6} />
                </Picker>
            </View>

            {spingroupPicker}

            <View style={styles.line}>
                <Text>Saltodrehungen: </Text>
                <Picker
                    style={{ height: 50, width: 100 }}
                    selectedValue={salti}
                    onValueChange={(itemValue, itemIndex) =>
                        setSalti(itemValue)
                    }>
                    <Picker.Item label="0" value={0} />
                    <Picker.Item label="0.5" value={1} />
                    <Picker.Item label="1" value={2} />
                    <Picker.Item label="1.5" value={3} />
                    <Picker.Item label="2" value={4} />
                    <Picker.Item label="2.5" value={5} />
                    <Picker.Item label="3" value={6} />
                    <Picker.Item label="3.5" value={7} />
                    <Picker.Item label="4" value={8} />
                    <Picker.Item label="4.5" value={9} />
                </Picker>
            </View>

            {spinInput}

            <View style={styles.line}>
                <Text>Ausführung: </Text>
                <Picker
                    style={{ height: 50, width: 150 }}
                    selectedValue={execution}
                    onValueChange={(itemValue, itemIndex) =>
                        setExecution(itemValue)
                    }>
                    <Picker.Item label="Gestreckt" value='A' />
                    <Picker.Item label="Gehechtet" value='B' />
                    <Picker.Item label="Gehockt" value='C' />
                    <Picker.Item label="Ausführung freigestellt" value='D' />
                </Picker>
            </View>

            <Text>Sprungnummer: {diveNmb}</Text>
            <DiveView id={diveNmb} />

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
    },
    line: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centeredLine: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FindeNumberScreen;

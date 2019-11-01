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
    const [execution, setExecution] = useState('B');
    const [height, setHeight] = useState(1);
    const [group, setGroup] = useState(1);
    const [secondGroup, setSecondGroup] = useState(1);
    const [handGroup, setHandGroup] = useState(1);
    const [salti, setSalti] = useState(1);
    const [spins, setSpins] = useState(1);
    const [isSpin, setIsSpin] = useState(false);

    let spinInput;
    if (group === 5 || isSpin) {
        spinInput =
            <View style={styles.line}>
                <Text style={styles.label}>Schrauben: </Text>
                <Picker
                    style={styles.input}
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
        spingroupPicker =
            <View style={styles.line}>
                <Text style={styles.label}>...</Text>
                <Picker
                    style={styles.input}
                    selectedValue={secondGroup}
                    onValueChange={(itemValue, itemIndex) =>
                        setSecondGroup(itemValue)
                    }>
                    <Picker.Item label="Vorwärts" value={1} />
                    <Picker.Item label="Rückwärts" value={2} />
                    <Picker.Item label="Auerbach" value={3} />
                    <Picker.Item label="Delphin" value={4} />
                </Picker>
            </View>;
    } else if (group === 6) {
        spingroupPicker =
            <View style={styles.line}>
                <Text style={styles.label}>...</Text>
                <Picker
                    style={styles.input}
                    selectedValue={handGroup}
                    onValueChange={(itemValue, itemIndex) => {
                        setHandGroup(itemValue);
                        if (itemValue <= 3) {
                            setSecondGroup(itemValue);
                            setIsSpin(false);
                        } else {
                            setSecondGroup(itemValue - 3);
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
            </View>
    }


    const diveNmb = ''
        + group
        + ((group === 5 || group === 6) ? secondGroup : '0')
        + salti
        + ((group === 5 || (group === 6 && isSpin)) ? spins : '');

    return (
        <View style={styles.screen}>
            <StatusBar hidden={true} />
            <DiveView style={styles.diveView} id={diveNmb} ex={execution} height={height} showBoxAlways={true} />
            <View style={styles.line}>
                <Text style={styles.label}>Gruppe: </Text>
                <Picker
                    style={styles.input}
                    selectedValue={group}
                    onValueChange={(itemValue, itemIndex) => {
                        setGroup(itemValue);
                        if (group !== 6 && isSpin) {
                            setIsSpin(false)
                        }
                    }
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
                <Text style={styles.label}>Saltodrehungen: </Text>
                <Picker
                    style={styles.input}
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
                <Text style={styles.label}>Ausführung: </Text>
                <Picker
                    style={styles.input}
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

            <View style={styles.line}>
                <Text style={styles.label}>Höhe:</Text>
                <Picker
                    style={styles.input}
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
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: '#050514',
    },
    line: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    diveView: {
        marginTop: 10,
        marginBottom: 50,
    },
    label: {
        width: '30%',
        color: '#e8e3e3',
        textAlign: 'right',
        margin: 20,
    },
    input: {
        width: '60%',
        height: 50,
        color: '#e8e3e3',
        backgroundColor: '#11113b',
    }
});

export default FindeNumberScreen;

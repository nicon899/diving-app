import React, { useState } from 'react';
import {
    View,
    Text,
    Picker,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import DiveItem from './DiveItem';
import DiveCard from './DiveCard';
import DiveView from './DiveView';
import Colors from '../assets/Colors'

const DiveTable = props => {
    const [enteredDiveId, setEnteredDiveId] = useState('');
    const [execution, setExecution] = useState('B');

    const numberInputHandler = inputText => {
        input = inputText.replace(/[^0-9]/g, '');
        setEnteredDiveId(inputText);
    };

    const addDive = () => {
        
    }

    return (
        <View style={[styles.table, { borderColor: props.color }, props.style]}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
            </View>

            <FlatList
                data={props.dives}
                renderItem={(dive) => <DiveItem
                    dive={dive.item}
                    status={props.status}
                    height={props.height} />
                }
                keyExtractor={dive => dive.id} />

            <View style={styles.addDive}>
                <View style={styles.inputContainer}>
                    <Text>Sprung: </Text>
                    <TextInput
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={numberInputHandler}
                        value={enteredDiveId}
                    />
                </View>
                <View style={styles.picker}>
                    <Picker
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
                <View style={[styles.addButton, { backgroundColor: props.color }]}  >
                    <TouchableOpacity onPress={addDive}>
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    table: {
        borderWidth: 2,
        borderRadius: 25,
        overflow: 'hidden',
        width: '100%'
    },
    addButton: {
        width: '10%',
        height: '100%'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        width: '90%',
        textAlign: 'center'
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    input: {
        height: '100%',
        width: '50%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        color: Colors.text,
        padding: 5,
        textAlign: 'center'
    },
    inputContainer: {
        height: '100%',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    addDive: {
        height: '15%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: 'black',
        borderTopWidth: 2,
        overflow: 'hidden',
    },
    picker: {
        width: '50%',
        height: 50,
        color: Colors.text,
        borderWidth: 1,
        borderColor: 'grey'

    }
});

export default DiveTable;

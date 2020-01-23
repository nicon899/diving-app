import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Picker,
} from 'react-native';
import DiveView from '../components/DiveView';
import Colors from '../assets/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

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
                <View style={styles.input}>
                    <Picker
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
            </View>
    }

    let spingroupPicker;
    if (group === 5) {
        spingroupPicker =
            <View style={styles.line}>
                <Text style={styles.label}>...</Text>
                <View style={styles.input}>
                    <Picker
                        selectedValue={secondGroup}
                        onValueChange={(itemValue, itemIndex) =>
                            setSecondGroup(itemValue)
                        }>
                        <Picker.Item label="Vorwärts" value={1} />
                        <Picker.Item label="Rückwärts" value={2} />
                        <Picker.Item label="Auerbach" value={3} />
                        <Picker.Item label="Delphin" value={4} />
                    </Picker>
                </View>
            </View>;
    } else if (group === 6) {
        spingroupPicker =
            <View style={styles.line}>
                <Text style={styles.label}>...</Text>
                <View style={styles.input}>
                    <Picker
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
            </View>
    }

    const diveNmb = ''
        + group
        + ((group === 5 || group === 6) ? secondGroup : '0')
        + salti
        + ((group === 5 || (group === 6 && isSpin)) ? spins : '');

    return (
        <View style={styles.screen}>
            <DiveView style={styles.diveView} id={diveNmb} ex={execution} height={height} showBoxAlways={true} animation={false} />
            <View style={styles.line}>
                <Text style={styles.label}>Gruppe: </Text>
                <View style={styles.input}>
                    <Picker
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
            </View>

            {spingroupPicker}

            <View style={styles.line}>
                <Text style={styles.label}>Saltodrehungen: </Text>
                <View style={styles.input}>
                    <Picker
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
            </View>

            {spinInput}

            <View style={styles.line}>
                <Text style={styles.label}>Ausführung: </Text>
                <View style={styles.input}>
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
            </View>

            <View style={styles.line}>
                <Text style={styles.label}>Höhe:</Text>
                <View style={styles.input}>
                    <Picker
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
        </View>
    );
};

FindeNumberScreen.navigationOptions = navData => {
    return {
        headerTitle: <Text style={{ fontSize: 22, fontWeight: 'bold', width: '100%' }}>Sprungnummer finden</Text>,
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
        alignItems: "center",
        backgroundColor: Colors.background,
    },
    line: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        maxHeight: 50
    },
    diveView: {
        marginTop: 10,
        marginBottom: 50,
    },
    label: {
        width: '30%',
        color: Colors.text,
        textAlign: 'right',
        margin: 20,
    },
    input: {
        width: '60%',
        height: '100%',
        color: Colors.text,
        borderWidth: 1,
        borderColor: 'black'

    }
});

export default FindeNumberScreen;

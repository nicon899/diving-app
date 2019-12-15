import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Picker,
    Text,
    Platform,
    Dimensions,
    TextInput,
    Button,
    NativeModules,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useDispatch } from 'react-redux';
import * as diveActions from '../store/actions/dives';
import Colors from '../assets/Colors';
import DiveTable from '../components/DiveTable';
const { StatusBarManager } = NativeModules;

const MyDivesScreen = props => {
    [height, setHeight] = useState('1');
    const [enteredDiveId, setEnteredDiveId] = useState('');
    const [execution, setExecution] = useState('B');
    const [fullScreenTable, setFullScreenTable] = useState('none');
    const [status, setStatus] = useState('learned');

    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setParams({
            'changeHeight': changeHeight,
            'height': height
        });
    }, []);

    const changeHeight = (height) => {
        setHeight(height);
        props.navigation.setParams({
            'height': height
        });
    };

    const numberInputHandler = inputText => {
        input = inputText.replace(/[^0-9]/g, '');
        setEnteredDiveId(inputText);
    };

    const addDive = () => {
        dispatch(diveActions.updateDive(enteredDiveId.toString(),
            {
                [height]: { [execution]: status },
            }));
    }

    if (fullScreenTable !== 'none') {
        return (
            <View style={styles.screen}>
                <View style={styles.addDive}>
                    <TextInput
                        style={styles.diveNmbInput}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={numberInputHandler}
                        value={enteredDiveId}
                        placeholder='Sprungnummer'
                    />
                    <View style={{ width: '30%' }}>
                        <Picker
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
                    <Button style={{ width: '10%' }} onPress={addDive} title='ADD' />
                </View>
                <DiveTable
                    style={styles.tableFullScreen}
                    status={fullScreenTable}
                    height={height}
                    title={'Deine Sprünge'}
                    color={'green'}
                    fullScreen={() => setFullScreenTable('none')}
                />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={{ color: 'black' }}>
            </View>
            <View style={styles.addDive}>
                <TextInput
                    style={styles.diveNmbInput}
                    blurOnSubmit
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={numberInputHandler}
                    value={enteredDiveId}
                    placeholder='Sprungnummer'
                />
                <View style={{ width: '30%' }}>
                    <Picker
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
                <View style={{ width: '45%' }}>
                    <Picker
                        selectedValue={status}
                        onValueChange={(itemValue, itemIndex) =>
                            setStatus(itemValue)
                        }>
                        <Picker.Item label="Gelernt" value='learned' />
                        <Picker.Item label="In Arbeit" value='inProgress' />
                        <Picker.Item label="Ziel" value='goal' />
                    </Picker>
                </View>
                <Button style={{ width: '10%' }} onPress={addDive} title='ADD' />
            </View>
            <View style={styles.tables}>
                <DiveTable
                    style={styles.table}
                    status={'learned'}
                    height={height}
                    fullScreen={() => { setFullScreenTable('learned'); setStatus('learned'); }}
                />
                <DiveTable
                    style={styles.table}
                    status={'inProgress'}
                    height={height}
                    fullScreen={() => { setFullScreenTable('inProgress'); setStatus('inProgress'); }}
                />
                <DiveTable
                    style={styles.table}
                    status={'goal'}
                    height={height}
                    fullScreen={() => { setFullScreenTable('goal'); setStatus('goal'); }}
                />
            </View>
        </View>
    );
};

MyDivesScreen.navigationOptions = navData => {
    return {
        headerTitle: <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meine Sprünge  </Text>,
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
        ),
        headerRight: (
            <View style={styles.selectHeight}>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={navData.navigation.getParam('height')}
                        onValueChange={(itemValue, itemIndex) =>
                            navData.navigation.getParam('changeHeight')(itemValue)
                        }>
                        <Picker.Item label="1m" value='1' />
                        <Picker.Item label="3m" value='3' />
                        <Picker.Item label="5m" value='5' />
                        <Picker.Item label="7.5m" value='7' />
                        <Picker.Item label="10m" value='10' />
                    </Picker>
                </View>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
    tables: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    table: {
        width: '95%',
        height: '30%',
    },
    tableFullScreen: {
        width: '95%',
        height: '90%',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        height: '40%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        padding: 10,
        elevation: 50,
    },
    picker: {
        width: 100,
    },
    selectHeight: {
        height: '100%',
        width: '90%',
        color: Colors.text,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    addDive: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    diveNmbInput: {
        height: '100%',
        width: '15%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        color: Colors.text,
        textAlign: 'center',
        maxHeight: Dimensions.get('window').height * 0.05,
    },
});

export default MyDivesScreen;

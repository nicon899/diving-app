import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../assets/Colors';
import DiveTable from '../components/DiveTable';

const MyDivesScreen = props => {
    [height, setHeigt] = useState('1');
    const learnedDives = useSelector(state => state.dives['learnedDives' + height]);
    const inProgressDives = useSelector(state => state.dives['inProgressDives' + height]);
    const goalDives = useSelector(state => state.dives['goalDives' + height]);

    return (
        <View style={styles.screen}>
            <StatusBar hidden={true} />
            <DiveTable
                style={styles.table}
                dives={learnedDives}
                status={'learned'}
                height={height}
                title={'Deine Sprünge'}
                color={'green'}
            />
            <DiveTable
                style={styles.table}
                dives={inProgressDives}
                status={'inProgress'}
                height={height}
                title={'Am erlernen'}
                color={'yellow'}
            />
            <DiveTable
                style={styles.table}
                dives={goalDives}
                status={'goal'}
                height={height}
                title={'Zielsprünge'}
                color={'blue'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    table: {
        width: '90%',
        height: '30%',
        margin: 10,
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
    }
});

export default MyDivesScreen;

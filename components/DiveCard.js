import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';

const DiveCard = props => {
    const dives = useSelector(state => state.dives.dives);
    const dive = dives.filter((dive) => dive.id === props.diveId)[0];
    console.log(props.diveId);

    if (!dive) {
        return <Text >Unbekannter Sprung</Text>
    }





    const getExecutions = (dive) => {
        let executions = '';
        if (dive.status[props.height].A === props.status) {
            executions += 'A'
        }
        if (dive.status[props.height].B === props.status) {
            executions += ' B'
        }
        if (dive.status[props.height].C === props.status) {
            executions += ' C'
        }
        if (dive.status[props.height].D === props.status) {
            executions += ' D'
        }
        return executions;
    }

    console.log(props.diveId);

    return (
        <View style={styles.contianer}>
            <Text>Test {dive}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contianer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#f2f2f2',
        height: 30,
    }
});

export default DiveCard;

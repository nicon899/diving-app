import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const DiveItem = props => {

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

    return (
        <View style={styles.contianer}>
            <Text>{props.dive.name} - {props.dive.id} {getExecutions(props.dive)}</Text>
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

export default DiveItem;

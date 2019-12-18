import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

const DiveItem = props => {
    const [folded, setFolded] = useState(false);

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

    const getSKG = (ex) => {
        var skg = JSON.parse(props.dive.skg);
        var skgValue = skg[ex][props.height.toString()];
        return skgValue !== '-/-' ? ' - SKG:' + skgValue : '';
    }

    if (folded) {
        return (
            <View style={styles.contianer}>
                <TouchableWithoutFeedback onPress={() => setFolded(false)}>
                <Text>{props.dive.name} - {props.dive.id} {getExecutions(props.dive)}</Text>
                </TouchableWithoutFeedback>
                <View style={styles.diveInfo}>
                    <View style={styles.diveInfoLine}>
                        <TouchableOpacity
                            onPress={() => { props.removeDive(props.dive.id, 'A') }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}> - </Text>
                        </TouchableOpacity>
                        <Text>{props.dive.id}A {getSKG('A')}</Text>
                    </View>
                    <Text>{props.dive.id}B {getSKG('B')}</Text>
                    <Text>{props.dive.id}C {getSKG('C')}</Text>
                    <Text>{props.dive.id}D {getSKG('D')}</Text>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableWithoutFeedback onPress={() => setFolded(true)}>
                <View style={styles.contianer}>
                    <Text>{props.dive.name} - {props.dive.id} {getExecutions(props.dive)}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

const styles = StyleSheet.create({
    contianer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#f2f2f2',
    },
    diveInfoLine: {
        flexDirection: 'row'
    }
});

export default DiveItem;

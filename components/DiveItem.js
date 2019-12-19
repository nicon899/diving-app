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
                    {props.dive.status[props.height].A === props.status &&
                        <View style={styles.diveInfoLine}>
                            <TouchableOpacity
                                onPress={() => { props.removeDive(props.dive.id, 'A') }}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22}}> - </Text>
                            </TouchableOpacity>
                            <Text>{props.dive.id}A {getSKG('A')}</Text>
                        </View>
                    }
                    {props.dive.status[props.height].B === props.status &&
                        <View style={styles.diveInfoLine}>
                            <TouchableOpacity
                                onPress={() => { props.removeDive(props.dive.id, 'B') }}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22}}> - </Text>
                            </TouchableOpacity>
                            <Text>{props.dive.id}B {getSKG('B')}</Text>
                        </View>
                    }
                    {props.dive.status[props.height].C === props.status &&
                        <View style={styles.diveInfoLine}>
                            <TouchableOpacity
                                onPress={() => { props.removeDive(props.dive.id, 'C') }}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22}}> - </Text>
                            </TouchableOpacity>
                            <Text>{props.dive.id}C {getSKG('C')}</Text>
                        </View>
                    }
                    {props.dive.status[props.height].D === props.status &&
                        <View style={styles.diveInfoLine}>
                            <TouchableOpacity
                                onPress={() => { props.removeDive(props.dive.id, 'D') }}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 22}}> - </Text>
                            </TouchableOpacity>
                            <Text>{props.dive.id}D {getSKG('D')}</Text>
                        </View>
                    }
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
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default DiveItem;

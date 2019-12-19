import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import DiveItem from './DiveItem';

const DiveTable = props => {
    const hasStatus = (status, dive, height) => {
        if (dive.status[height]['A'] === status) {
            return true;
        }
        if (dive.status[height]['B'] === status) {
            return true;
        }
        if (dive.status[height]['C'] === status) {
            return true;
        }
        if (dive.status[height]['D'] === status) {
            return true;
        }
        return false;
    }

    const dives = useSelector(state => state.dives.dives.filter(dive => hasStatus(props.status, dive, height)));

    const tableColor = () => {
        switch (props.status) {
            case 'learned':
                return 'green';
            case 'inProgress':
                return 'yellow';
            case 'goal':
                return 'blue';
        }
    }

    const tableTitle = () => {
        switch (props.status) {
            case 'learned':
                return 'Vorhandene Sprünge';
            case 'inProgress':
                return 'Am erlernen';
            case 'goal':
                return 'Zielsprünge';
        }
    }

    return (
        <View style={[styles.table, { borderColor: tableColor() }, props.style]}>
            <View style={styles.header}>
                <Text style={styles.title}>{tableTitle()}</Text>
                <View style={styles.btnSize}>
                    <TouchableOpacity onPress={props.fullScreen}>
                        <Text style={styles.btnSizeText}>[ ]</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={dives}
                renderItem={(dive) => <DiveItem
                    dive={dive.item}
                    status={props.status}
                    height={props.height}
                    removeDive={props.removeDive}
                />
                }
                keyExtractor={dive => dive.id} />
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
        height: '20%',
        justifyContent: 'flex-start',
        maxHeight: Dimensions.get('window').height * 0.075,
        borderColor: 'black',
        borderBottomWidth: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        width: '90%',
        textAlign: 'center'
    },
    btnSize: {
        width: '10%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    btnSizeText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default DiveTable;
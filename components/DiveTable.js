import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import DiveItem from './DiveItem';

let color = 'black'

const DiveTable = props => {


    return (
        <View style={[styles.table, { borderColor: props.color }, props.style]}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.addButton}  >
                    <TouchableOpacity onPress={() => {
                        props.showModal(<Text>Hello World</Text>)
                    }}>
                        <View style={{ backgroundColor: props.color }}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={props.dives}
                renderItem={(dive) => <DiveItem
                    dive={dive.item}
                    status={props.status}
                    height={props.height} />
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
        width: '10%'
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
    }
});

export default DiveTable;

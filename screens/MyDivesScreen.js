import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Modal,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../assets/Colors';
import DiveTable from '../components/DiveTable';

const MyDivesScreen = props => {
    [height, setHeigt] = useState('1');
    [showAddDiveModal, setShowAddDiveModal] = useState(false);
    [modalContent, setModalContent] = useState(<View></View>);

    const learnedDives = useSelector(state => state.dives['learnedDives' + height]);
    const inProgressDives = useSelector(state => state.dives['inProgressDives' + height]);
    const goalDives = useSelector(state => state.dives['goalDives' + height]);

    const showModal = (content) => {
        setModalContent(
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={{ height: '90%' }}>{content}</View>
                    <View style={{ height: '10%' ,alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowAddDiveModal(false);
                            }}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        setShowAddDiveModal(true);
    }

    return (
        <View style={styles.screen}>
            <StatusBar hidden={true} />

            <Modal
                animationType='fade'
                transparent={true}
                visible={showAddDiveModal}
                onRequestClose={() => {
                }}>
                {modalContent}
            </Modal>

            <DiveTable
                style={styles.table}
                dives={learnedDives}
                status={'learned'}
                height={height}
                title={'Deine Sprünge'}
                color={'green'}
                showModal={showModal}
            />
            <DiveTable
                style={styles.table}
                dives={inProgressDives}
                status={'inProgress'}
                height={height}
                title={'Am erlernen'}
                color={'yellow'}
                showModal={showModal}
            />
            <DiveTable
                style={styles.table}
                dives={goalDives}
                status={'goal'}
                height={height}
                title={'Zielsprünge'}
                color={'blue'}
                showModal={showModal}
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
        maxHeight: '30%',
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

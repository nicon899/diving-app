import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const QuizCard = props => {

    if (props.guessedWrong) {
        return (
            <View style={[styles.wrongCard, props.style]}>
                <Text
                    style={
                        [styles.text,
                        { fontWeight: 'bold' }]}>
                    {props.nmb}
                </Text>
                <Text style={styles.text}>{props.text}</Text>
            </View >
        );
    } else {
        return (
            <TouchableOpacity onPress={
                () => {
                    props.onPress(props.index);
                }
            }>
                <View style={[styles.card, props.style]}>
                    <Text style={styles.text}>{props.text}</Text>
                </View >
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    card: {
        width: 135,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25,
        padding: 5
    }, wrongCard: {
        width: 135,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 25,
        padding: 5
    },
    text: {
        textAlign: 'center',
        width: '100%'
    }
});

export default QuizCard;

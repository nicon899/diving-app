import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

const LearnDivesScreen = props => {
    return (
        <View >
            <Text>Learn Dives</Text>
            <Button
                title="Sprungnummern verstehen"
                onPress={() => {
                    console.log("click")
                    props.navigation.navigate('Info');
                }} />
            <Button
                title="Sprungnummer Quiz"
                onPress={() => {
                    console.log("click")
                    props.navigation.navigate('Quiz');
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'baseline'
    }
});

LearnDivesScreen.navigationOptions = navData => {
    return {
        header: null
    };
};

export default LearnDivesScreen;

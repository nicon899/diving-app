import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const LearnDivesInfoScreen = props => {
    return (
        <View >
            <Text>Info</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

LearnDivesInfoScreen.navigationOptions = navData => {
    return {
        title: 'Learn',
        headerStyle: {height: 30}
    };
};

export default LearnDivesInfoScreen;

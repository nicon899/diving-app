import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const LearnDivesScreen = props => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={() => {
                    props.navigation.navigate('Info');
                }} >
                <Text>Sprungnummern erklärt</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'blue' }]}
                onPress={() => {
                    props.navigation.navigate('Quiz');
                }} >
                <Text>QUIZ</Text>
            </TouchableOpacity>
        </View>
    );
};

LearnDivesScreen.navigationOptions = navData => {
    return {
        headerTitle: <Text style={{ fontSize: 22, fontWeight: 'bold', width: '100%' }}>Lernen</Text>,
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    button: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default LearnDivesScreen;

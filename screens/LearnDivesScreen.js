import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const LearnDivesScreen = props => {

    return (
        <View style={styles.container}>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default LearnDivesScreen;

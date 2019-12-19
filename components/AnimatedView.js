import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import { Icon } from 'react-native-elements'

const AnimatedView = props => {
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    const [animatedFAllValue, setAnimatedFallValue] = useState(new Animated.Value(0));
    const [aniHeight, setAniHeight] = useState(0);
    const [diverHeight, setDiverHeight] = useState(0);
    const [diverDirection, setDiverDirection] = useState(props.directionForward ? 0 : 2)
    const [spins, setSpins] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const [doSpin, setDoSpin] = useState(false);

    const diverImages = [require('../assets/images/diverForwards.png'), require('../assets/images/diverFront.png'), require('../assets/images/diverBackwards.png'), require('../assets/images/diverBack.png')]

    const durationRotations = Math.round((-4.167 * props.xrotation * props.xrotation) + 541.667 * props.xrotation + 462.5);
    const durationSpins = Math.round(200 * props.spins * 2);


    const interpolatedRotateAnimation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: props.handstand ? props.invard ? ['180deg', '0deg'] : ['180deg', '360deg'] : props.invard ? ['360deg', '180deg'] : ['0deg', '180deg']
    });

    const animation = Animated.timing(animatedValue, {
        toValue: props.xrotation,
        duration: durationRotations
    });

    const fallAnimation = Animated.timing(animatedFAllValue, {
        toValue: (aniHeight / 2) - (diverHeight / 2),
        duration: props.spins !== 0 ? (durationSpins + durationRotations) + 1000 : durationRotations + 500
    });

    const diveInAnimation = Animated.timing(animatedFAllValue, {
        toValue: (aniHeight / 2) + (diverHeight / 2),
        duration: 1000
    });

    const playDiverAnimation = () => {
        if (aniHeight !== 0 && diverHeight !== 0 && spins === 0 && animate) {
            animation.start(() => {
                if (props.spins === 0) {
                    setRepeat(true);
                    setAnimate(false);
                } else {
                    setSpins(props.spins * 2)
                    setDoSpin(true);
                }
            })
            if (props.spins === 0) {
                fallAnimation.start(() => diveInAnimation.start(), setAnimate(false));
            } else {
                fallAnimation.start(() => diveInAnimation.start(), setAnimate(false));
            }
        }
    }

    useEffect(() => {
        console.log('done: ' +doSpin)
        if (spins > 0 && doSpin) {
            setDiverDirection(diverDirection === 3 ? 0 : diverDirection + 1);
            setTimeout(function () {
                setSpins(spins - 1);
            }, 200);
            if (spins <= 1) {
                setDoSpin(false)
                setRepeat(true)
            }
        }
    }, [spins, doSpin]);

    useEffect(() => {
        playDiverAnimation();
    });

    useEffect(() => {
        setAnimate(true);
        return () => {
            setAnimate(false);
            setSpins(0);
        }
    }, []);

    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.animationContainer}>
                <View style={styles.reloadButton}>
                    <Icon
                        name='repeat'
                        type='feather'
                        color='black'
                        disabled={!repeat}
                        onPress={() => {
                            console.log('REPEAT')
                            setRepeat(false)
                            setSpins(0);
                            setAnimate(false);
                            setDiverDirection(props.directionForward ? 0 : 2)
                            setAnimatedValue(new Animated.Value(0));
                            setAnimatedFallValue(new Animated.Value(0));
                            setAnimate(true);
                        }} />
                </View>
                <View
                    onLayout={(e) => { setAniHeight(e.nativeEvent.layout.height) }}
                    style={styles.animationView}>
                    <Animated.Image
                        onLayout={(e) => { setDiverHeight(e.nativeEvent.layout.height) }}
                        style={[styles.diver, { transform: [{ translateY: animatedFAllValue }, { rotate: interpolatedRotateAnimation }] }]}
                        source={diverImages[diverDirection]}
                    />
                </View>
            </View>
            <View style={styles.water}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    diver: {
        width: '25%', height: '25%',
        resizeMode: 'contain',
    },
    reloadButton: {
        width: '100%',
        alignItems: 'flex-end'
    },
    animationView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
    },
    animationContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    water: {
        height: 20,
        backgroundColor: 'blue'
    }
});

export default AnimatedView;

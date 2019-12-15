import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    TextInput,
    Button,
    Modal
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import QuizCard from '../components/QuizCard'
import AnimatedView from '../components/AnimatedView';

const QuizScreen = props => {
    const dives = useSelector(state => state.dives.dives);
    const [result, setResult] = useState("");
    const [rndIndex, setRndIndex] = useState(Math.round(Math.random() * (dives.length - 1)));
    const [sltIndex, setSltIndex] = useState(Math.round(Math.random() * 3));
    const [points, setPoints] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [answers, setAnswers] = useState([{ name: "", id: 0 }, { name: "", id: 0 }, { name: "", id: 0 }, { name: "", id: 0 }]);
    const [guess1, setGuess1] = useState(false);
    const [guess2, setGuess2] = useState(false);
    const [guess3, setGuess3] = useState(false);
    const [guess4, setGuess4] = useState(false);
    const [questionType, setQuestionType] = useState(0.5);
    const [enteredValue, setEnteredValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    const numberInputHandler = inputText => {
        input = inputText.replace(/[^0-9]/g, '');
        setEnteredValue(input);
    };

    const loadNewQuestion = () => {
        setResult("");
        setSltIndex(Math.round(Math.random() * 3));
        do {
            setRndIndex(Math.round(Math.random() * (dives.length - 1)));
        } while (parseInt(dives[rndIndex].id.charAt(0) === 0 || (parseInt(dives[rndIndex].id.charAt(0) === 5 && parseInt(dives[rndIndex].id.charAt(1) === 0)))));

        setPoints(points + 1);
        setGuess1(false);
        setGuess2(false);
        setGuess3(false);
        setGuess4(false);
        setRounds(rounds + 1);
    }

    const onAnswer = (index) => {
        if (sltIndex === index) {
            setShowModal(true);
            return true;
        } else {
            setResult("Leider falsch!");
            setPoints(0);
            switch (index) {
                case 0: setGuess1(true);
                    break;
                case 1: setGuess2(true);
                    break;
                case 2: setGuess3(true);
                    break;
                case 3: setGuess4(true);
                    break;
            }
            return false;
        }
    }

    useEffect(() => {
        let newAns = [];
        for (i = 0; i < 4; i++) {
            if (i === sltIndex) {
                newAns.push(
                    {
                        nmb: dives[rndIndex].id,
                        name: dives[rndIndex].name,
                        answer: true
                    });
            } else {
                const index = Math.round(Math.random() * (dives.length - 1));
                newAns.push(
                    {
                        nmb: dives[index].id,
                        name: dives[index].name,
                        answer: false
                    });
            }
        }
        setAnswers(newAns);
        setQuestionType(Math.random());
    }, [rounds]);

    let answerView;
    if (questionType < 0.2) {
        answerView = (
            <View style={styles.answers}>
                <Text style={{ color: 'red' }} >{result}</Text>
                <View style={styles.answersInputNumber}>
                    <TextInput style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <Button
                        title='OK'
                        onPress={() => {
                            Keyboard.dismiss();
                            setEnteredValue('');
                            if (parseInt(dives[rndIndex].id) === parseInt(enteredValue)) {
                                setShowModal(true);
                            } else {
                                setResult("Leider falsch!");
                                setPoints(0);
                            }
                        }}>
                    </Button>
                </View>
            </View>)
    } else {
        answerView = (
            <View style={styles.answers}>
                <Text style={{ color: 'red' }} >{result}</Text>
                <View style={styles.line}>
                    <QuizCard
                        style={styles.quizCard}
                        text={answers[0].name}
                        nmb={answers[0].nmb}
                        index={0}
                        onPress={onAnswer}
                        guessedWrong={guess1}
                        askName={questionType >= 0.6}
                    />
                    <QuizCard
                        style={styles.quizCard}
                        text={answers[1].name}
                        nmb={answers[1].nmb}
                        index={1}
                        onPress={onAnswer}
                        guessedWrong={guess2}
                        askName={questionType >= 0.6}
                    />
                </View>
                <View style={styles.line}>
                    <QuizCard
                        style={styles.quizCard}
                        text={answers[2].name}
                        nmb={answers[2].nmb}
                        index={2}
                        onPress={onAnswer}
                        guessedWrong={guess3}
                        askName={questionType >= 0.6}
                    />
                    <QuizCard
                        style={styles.quizCard}
                        text={answers[3].name}
                        nmb={answers[3].nmb}
                        index={3}
                        onPress={onAnswer}
                        guessedWrong={guess4}
                        askName={questionType >= 0.6}
                    />
                </View>
            </View>);
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }} >
            <View style={styles.contianer}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                    }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>

                        <View style={styles.modal}>
                            <View style={{ padding: 20, height: '100%', width: '100%' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 22, width: '100%', textAlign: 'center' }}>Richtig</Text>
                                </View>
                                <AnimatedView
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                    }}
                                    xrotation={parseInt(dives[rndIndex].id.charAt(2))}
                                    invard={[3, 4].includes(parseInt(dives[rndIndex].id.charAt(0))) || ([5, 6].includes(parseInt(dives[rndIndex].id.charAt(0))) && ([3, 4].includes(parseInt(dives[rndIndex].id.charAt(1)))))}
                                    handstand={parseInt(dives[rndIndex].id.charAt(0)) === 6}
                                    spins={parseInt(dives[rndIndex].id.charAt(0)) === 5 || (parseInt(dives[rndIndex].id.charAt(0)) === 6 && dives[rndIndex].id.length === 4) ? parseInt(dives[rndIndex].id.charAt(3)) : 0}
                                    directionForward={[1, 3].includes(parseInt(dives[rndIndex].id.charAt(0))) || ([5, 6].includes(parseInt(dives[rndIndex].id.charAt(0))) && ([1, 3].includes(parseInt(dives[rndIndex].id.charAt(1)))))}
                                />
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                                    <Text>{dives[rndIndex].id} - {dives[rndIndex].name}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(false);
                                        loadNewQuestion();
                                    }}>
                                    <Text style={{ color: 'blue', fontSize: 18, margin: 5, marginBottom: 10 }}>Weiter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.points}>
                    <Text>Punkte: {points}</Text>
                </View>
                <View style={styles.question}>
                    {questionType >= 0.6 ?
                        <Text>Welcher Sprung hat die Nummer {dives[rndIndex].id}?</Text>
                        : <Text>Welche Nummer hat der Sprung: <Text style={{ fontWeight: 'bold' }}>{dives[rndIndex].name}</Text> ?</Text>}
                </View>
                {answerView}
            </View>
        </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        alignItems: 'center',
    },
    answers: {
        height: '40%',
        justifyContent: 'center',
    },
    answersInputNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    line: {
        width: '100%',
        flexDirection: 'row',
    },
    quizCard: {
        margin: 5,
    },
    question: {
        margin: 50,
        width: '100%',
        alignItems: 'center',
        height: '20%'
    },
    points: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    input: {
        height: 30,
        width: 50,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    modal: {
        justifyContent: 'center',
        height: '80%',
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        elevation: 50,
        padding: 10
    }
});

QuizScreen.navigationOptions = navData => {
    return {
        title: 'Quiz',
    };
};

export default QuizScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

const LearnDivesInfoScreen = props => {
    return (
        <ScrollView>
            <Text styles={styles.text}>(1) Alle Sprünge sind durch ein System von drei oder vier Ziffern gefolgt von einemBuchstaben gekennzeichnet.</Text>
            <Text styles={styles.text}>(2) Die erste Ziffer bezeichnet die Sprunggruppe, zu der der Sprung gehört: 1=Vorwärts, 2=Rückwärts, 3=Auerbach, 4=Delphin, 5=Schraube und 6=Handstand</Text>
            <Text styles={styles.text}>(3) Die dritte Ziffer bezeichnet die Anzahl der auszuführenden halben Salti: 1 = ½ Salto, 3 = 1 ½ Salti, etc. Wenn mehr als 4 ½ Salti gezeigt werden, gibt es 4 Ziffern, wobei die dritte und die vierte Ziffer die Anzahl der halben Salti anzeigt. Zum Beispiel 11 halbe Salti = 5 ½ Salti vorwärts als 1011.</Text>
            <Text styles={styles.text}>(4) In der Vorwärts-, Rückwärts-, Auerbach- und Delphingruppe bezeichnet eine '1' für die zweite Ziffer, dass der Sprung eine Flugphase beinhaltet. Enthält er keineFlugphase, ist für die zweite Ziffer eine Null einzusetzen.</Text>
            <Text styles={styles.text}>(5) Bei Handstandsprüngen bezeichnet die zweite Ziffer die Gruppe oder Richtung, zu der der Sprung gehört: 1=Vorwärts, 2=Rückwärts, 3=Auerbach.</Text>
            <Text styles={styles.text}>(6) In der Schraubengruppe (Sprünge, die mit einer 5 beginnen) bezeichnet die zweite Ziffer die Gruppe oder Absprungrichtung wie in Abs. 2.</Text>
            <Text styles={styles.text}>(7) In der Schrauben- und Handstandgruppe bezeichnet die vierte Ziffer die Anzahl der auszuführenden halben Schrauben.</Text>
            <Text styles={styles.text}>(8) Die Buchstaben am Ende der Ziffern bezeichnen die Position, in der der Sprung ausgeführt wird: A = gestreckt, B = gehechtet, C = gehockt und D = frei (frei bedeutetjede beliebige Kombination einer anderen Position während des Schraubensprunges).</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: 'green'
    }
});

LearnDivesInfoScreen.navigationOptions = navData => {
    return {
        title: 'Sprungnummern erklärt',
    };
};

export default LearnDivesInfoScreen;

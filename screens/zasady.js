import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import firebase from '../database/firebaseDb';

export default class gatunkiZ extends Component {
    render() {
        return (

            <ScrollView>
                <View style={styles.zagrozenieKontener}>
                    <Image style={styles.zagrozenieImg} source={require('../images/icons/safety.png')} />
                    <Text style={styles.zagrozenieNaglowek}>Zasady w otoczeniu zagrożonych gatunków: </Text>
                    <Unorderedlist color='#9e0202' style={styles.zagrozeniePunkty}><Text style={styles.zagrozenieTekst}>Pod żadnym pozorem nie dotykać młodych,</Text></Unorderedlist>
                    <Unorderedlist color='#9e0202' style={styles.zagrozeniePunkty}><Text style={styles.zagrozenieTekst}>Zachowywać stosowną odległość,</Text></Unorderedlist>
                    <Unorderedlist color='#9e0202' style={styles.zagrozeniePunkty}><Text style={styles.zagrozenieTekst}>"Pamiętać o zachowaniu ciszy,"</Text></Unorderedlist>
                    <Unorderedlist color='#9e0202' style={styles.zagrozeniePunkty}><Text style={styles.zagrozenieTekst}>Dbać o miejsca lęgowe, </Text></Unorderedlist>
                    <Unorderedlist color='#9e0202' style={styles.zagrozeniePunkty}><Text style={styles.zagrozenieTekst}>Nie straszyć oraz nie płoszyć ptaków, </Text></Unorderedlist>
                    <Image style={styles.zagrozenieImg} source={require('../images/icons/warning.png')} />
                </View>
            </ScrollView>

        )

    }
}

const styles = StyleSheet.create({
    zagrozenieKontener: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
    },
    zagrozenieNaglowek: {
        paddingVertical: 15,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    zagrozeniePunkty: {
        paddingVertical: 10,
        fontSize: 20,
    },
    zagrozenieTekst: {
        paddingVertical: 10,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d12121'

    },
    zagrozenieImg: {
        width: 100,
        height: 100
    },
});
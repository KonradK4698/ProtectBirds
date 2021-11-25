import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable } from 'react-native';
import firebase from '../database/firebaseDb';


export default class gatunkiZ extends Component {


    constructor(props) {
        super(props);
        this.usunPost = this.usunPost.bind(this);
        this.getData = this.getData.bind(this);
    }

    usunPost(idPostu) {
        firebase.database().ref('/endangeredSpecies/' + idPostu).remove();
        this.forceUpdate();
    }

    getData() {
        var gatunkiZagrozone = [];
        let i = 0;


        firebase.database().ref('/endangeredSpecies').on('value', (snapshot) => {

            snapshot.forEach((childSnapshot) => {

                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                gatunkiZagrozone.push(
                    <View key={key} style={styles.zagrozenieKontener}>
                        <Text style={styles.zagrozenieNaglowek}>{childData.naglowek}</Text>
                        <Image style={styles.zagrozenieImg} source={{ uri: childData.imgPath }} />
                        <Text style={styles.zagrozenieKlasa}>Klasa zagrożenia: {childData.klasaZagrozenia}</Text>
                        <Text style={styles.zagrozenieLeg}>Miejsce lęgu w Polsce: {childData.miejsceLegu}</Text>
                        <Text style={styles.zagrozenieIlosc}>Liczebność w Polsce: {childData.licznoscGatunku ? childData.licznoscGatunku : "200 par"}</Text>
                        <Text style={styles.zagrozenieOpis}>{childData.opis}</Text>
                        <Text style={styles.zagrozenieAutor}>Autor: {childData.userName}</Text>
                        {childData.userID == firebase.auth().currentUser.uid ?
                            <Pressable style={styles.pressButton} onPress={this.usunPost.bind(this, key)}>
                                <Text style={styles.buttonText}>Usuń wpis</Text>
                            </Pressable> : null}
                    </View>
                )
                i++
            });
        })

        return gatunkiZagrozone;
    }

    render() {

        let gatunkiZagrozone = this.getData();
        return (

            <ScrollView>
                {gatunkiZagrozone.length > 0 ? gatunkiZagrozone : <Text>Brak wpisów</Text>}
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
    zagrozenieOpis: {
        paddingVertical: 10,
        textAlign: 'justify',
        fontSize: 14,

    },
    zagrozenieKlasa: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#c91002',
        fontWeight: 'bold'
    },
    zagrozenieLeg: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#0c9107',
        fontWeight: 'bold'
    },
    zagrozenieIlosc: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 16,
        color: '#063fa1',
        fontWeight: 'bold'
    },
    zagrozenieImg: {
        width: 300,
        height: 300
    },
    zagrozenieAutor: {
        paddingVertical: 10,
        textAlign: 'right',
        fontSize: 12,
        alignSelf: 'stretch',
        fontWeight: 'bold'
    },
    pressButton: {
        width: 100,
        height: 30,
        backgroundColor: "#f5574c",
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#FFF',
    },
});
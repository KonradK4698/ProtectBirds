import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import firebase from '../database/firebaseDb';

export default class Zagrozenia extends Component {
    constructor(props) {
        super(props);
        this.usunPost = this.usunPost.bind(this);
        this.getData = this.getData.bind(this);
    }

    usunPost(idPostu) {
        firebase.database().ref('/protection/' + idPostu).remove();
        this.forceUpdate();
    }

    getData() {
        var ochrona = [];
        let i = 0;


        firebase.database().ref('/protection').on('value', (snapshot) => {

            snapshot.forEach((childSnapshot) => {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                ochrona.push(
                    <View key={key} style={styles.zagrozenieKontener}>
                        <Image style={styles.zagrozenieImg} source={{ uri: childData.imgPath }} />
                        <Text style={styles.zagrozenieNaglowek}>{childData.naglowek}</Text>
                        <Text style={styles.zagrozenieOpis}>{childData.opis}</Text>
                        {childData.userID == firebase.auth().currentUser.uid ?
                            <Pressable style={styles.pressButton} onPress={this.usunPost.bind(this, key)}>
                                <Text style={styles.buttonText}>Usuń</Text>
                            </Pressable> : null}
                    </View>
                )
                i++
            });
        })

        return ochrona;
    }





    render() {
        let ochrona = this.getData();
        return (

            <ScrollView>
                {ochrona.length > 0 ? ochrona : <Text>Brak wpisów</Text>}
            </ScrollView>

        )

    }
}

const styles = StyleSheet.create({
    zagrozenieKontener: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        flex: 2,
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
    zagrozenieImg: {
        width: 80,
        height: 80
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
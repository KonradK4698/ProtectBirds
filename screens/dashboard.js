import { Form } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import firebase from '../database/firebaseDb';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
        }
    }



    wylogujFunc = () => {

        firebase.auth().signOut().then(() => {
            console.log("wylogowano")
        })
            .catch(error => this.setState({ errorMessage: error.message }))
        this.props.navigation.navigate('login')
    }



    render() {
        var isUser = firebase.auth().currentUser;
        if (isUser) {
            this.state = {
                displayName: firebase.auth().currentUser.displayName,
                uid: firebase.auth().currentUser.uid
            }

        }


        return (
            <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textStyle}>
                    Witaj {firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "unknown user"}
                </Text>
                <View style={styles.touchableView}>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('gatunkiZ')}>
                        <Image style={styles.touchableImage} source={require('../images/required/endangeredBird.png')} />
                        <Text style={styles.touchableText}>Polskie gatunki zagrożone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('dodajGatunki')}>
                        <Image style={styles.touchableImage} source={require('../images/required/iconADD.png')} />
                        <Text style={styles.touchableText}>Dodaj gatunki zagrożone</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.touchableView}>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('Zagrozenia')}>
                        <Image style={styles.touchableImage} source={require('../images/required/dangerIcon.png')} />
                        <Text style={styles.touchableText}>Zagrożenia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('dodajZagrozenia')}>
                        <Image style={styles.touchableImage} source={require('../images/required/iconADD.png')} />
                        <Text style={styles.touchableText}>Dodaj zagrożenia</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.touchableView}>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('ochrona')}>
                        <Image style={styles.touchableImage} source={require('../images/required/birdProtection.png')} />
                        <Text style={styles.touchableText}>Poznaj możliwości ochrony</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('dodajOchrone')}>
                        <Image style={styles.touchableImage} source={require('../images/required/iconADD.png')} />
                        <Text style={styles.touchableText}>Dodaj możliwości ochrony</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.touchableView}>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.navigation.navigate('zasady')}>
                        <Image style={styles.touchableImage} source={require('../images/required/mainRules.png')} />
                        <Text style={styles.touchableText}>Główne zasady</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.wylogujFunc()}>
                        <Image style={styles.touchableImage} source={require('../images/required/logout.png')} />
                        <Text style={styles.touchableText}>Wyloguj</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.touchableView}>

                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        paddingVertical: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonStyle: {
        color: "#3740FE",
        marginVertical: 20,
    },
    space: {
        height: 20,
        width: '100%'
    },
    touchableView: {
        display: "flex",
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    touchableStyle: {
        display: 'flex',
        width: '45%',
        backgroundColor: '#FFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    touchableImage: {
        height: 50,
        width: 50,
    },
    touchableText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        width: '100%',
    }
});
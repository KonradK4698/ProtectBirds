import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Button, NativeModules, Alert, Pressable, ActivityIndicator } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import RNPickerSelect from "react-native-picker-select";
import firebase from '../database/firebaseDb';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'react-native-image-picker';
export default class dodajGatunki extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageDownloadURL: null,
            changeText: '',
            setText: '',
            widthIMG: 0,
            heightIMG: 0,
            isLoadingPhoto: null,
        }
    }


    _getPhotoLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3]
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        this.setState({ widthIMG: 200 });
        this.setState({ heightIMG: 200 });
    }

    dodajFoto = async () => {
        this.setState({ isLoadingPhoto: true })
        const splittedl = this.state.image.split('/').length;
        let name = this.state.image.split('/')[splittedl - 1];

        const response = await fetch(this.state.image);
        const blob = await response.blob();
        let ref = firebase.storage().ref('zagrozenia/').child(name);
        ref.put(blob).then(() => {
            this.setState({ isLoadingPhoto: false })
            Alert.alert("Zdjecie zostało dodane");
            firebase.storage().ref('zagrozenia/').child(name).getDownloadURL().then(
                url => { this.setState({ imageDownloadURL: url }) })
        });

    }

    dodajDane = () => {
        var myRef = firebase.database().ref('/currentThreat');
        // var key = myRef.key;
        var user = firebase.auth().currentUser;
        var newData = {
            userID: user.uid,
            imgPath: this.state.imageDownloadURL,
            naglowek: this.state.naglowekZ,
            opis: this.state.opisZ,
        }
        myRef.push(newData).then(() => {
            Alert.alert("Dane zostały dodane");
        });
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    render() {

        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                <Text style={styles.inputLabel}>
                    Wybierz grafikę przedstawiającą zagrożenie:
                </Text>
                <Pressable style={styles.pressButton} onPress={() => { this._getPhotoLibrary() }}>
                    <Text style={styles.buttonText}>Wybierz grafikę</Text>
                </Pressable>
                <Image style={{ width: this.state.widthIMG, height: this.state.heightIMG, marginVertical: 10 }} source={{ uri: this.state.image }} />

                {
                    this.state.image != null && this.state.isLoadingPhoto == null ?
                        <Pressable style={styles.pressButton} onPress={() => { this.dodajFoto() }}>
                            <Text style={styles.buttonText}>Zapisz grafikę</Text>
                        </Pressable>
                        : this.state.image != null && this.state.isLoadingPhoto == true ?
                            <ActivityIndicator size="large" color="#00ff00" />
                            : null
                }


                <Text style={styles.inputLabel}>
                    Wprowadź nazwę zagrożenia
                </Text>
                <TextInput style={styles.inputStyle} placeholder="Wprowadź nazwę" onChangeText={(val) => this.updateInputVal(val, 'naglowekZ')}></TextInput>

                <Text style={styles.inputLabel}>
                    Wprowadź opis zagrożenia
                </Text>
                <TextInput style={styles.inputStyle} multiline={true} numberOfLines={8} placeholder="Wprowadź opis" onChangeText={(val) => this.updateInputVal(val, 'opisZ')}></TextInput>

                <Pressable style={styles.pressButton} onPress={() => { this.dodajDane() }}>
                    <Text style={styles.buttonText}>Dodaj</Text>
                </Pressable>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        paddingLeft: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderBottomLeftRadius: 5,
        fontSize: 15,
        marginVertical: 10,
    },
    inputLabel: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputButton: {
        alignSelf: "center",
        borderRadius: 50,

    },
    pressButton: {
        width: 160,
        height: 40,
        backgroundColor: "#6cc46f",
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFF',
    },
    chooseImge: {
        marginVertical: 10,
    }

});



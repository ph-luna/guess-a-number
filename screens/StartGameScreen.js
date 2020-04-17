import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'



function StartGameScreen(props){

    let confirmedOutput = null
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {
        function updateLayout() {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    

    function numberInputHandler(inputText) {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    function resetInputHandler() {
        setEnteredValue('')
        setConfirmed(false)
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{text: 'Okay ', style: 'destructive', onPress: resetInputHandler}])
            return
        }

        setConfirmed(true)
        setSelectedNumber(parseInt(chosenNumber))
        setEnteredValue('')
        Keyboard.dismiss()
    }

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected:</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton title='START GAME'  onPress={() => props.onStartGame(selectedNumber)} />
            </Card>
        )
    } //--------------------

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                <View style={styles.screen}>
                    <Text style={styles.title}>Start a New Game!</Text>
                    <Card style={styles.inputContainer}>
                        <Text>Select a Number</Text>
                        <Input 
                            style={styles.input} 
                            maxLength={2}
                            keyboardType='numeric'
                            blurOnSubmit
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={enteredValue}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={{ width: buttonWidth }}>
                                <Button title='Reset' onPress={resetInputHandler} color={Colors.secondary} />
                            </View>
                            <View style={{ width: buttonWidth }}>
                                <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },

    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },

    // button: {
    //     width: Dimensions.get('window').width / 4 ,
    // },

    input: {
        width: 47,
        textAlign: 'center'
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen
import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import { ScreenOrientation } from 'expo'

function generateRandomBetween(min, max, exclude) {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randonNum = Math.floor(Math.random() * (max - min)) + min

    if(randonNum === exclude){
        return generateRandomBetween(min, max, exclude)
    }else{
        return randonNum
    }
}

function renderListItem(value, numOfRound) {
    return(
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRound}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    )
}

export default function GameScreen(props) {
    const { userChoice, onGameOver, guessRound } = props
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    let round = useRef(0)
    const [pastGuesses, setPastGuesses] = useState([])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        function updateLayout() {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => Dimensions.removeEventListener('change', updateLayout)
    })

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(true)
            guessRound(round.current)
        }else{
            round.current++
        }
    }, [currentGuess, userChoice, onGameOver])

    function nextGuessHandler(direction){
        if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)){
            Alert,alert('Don\'t lie!!', 'Ypu know that this is wrong...', [{text: 'Sorry', style: 'cancel'}])
            return
        }

        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesses => [nextNumber ,...curPastGuesses])
    }

    if(availableDeviceHeight < 500) {
        return (
            <View style={styles.screenLandscape}>
                <View style={styles.landscapeContainer}>
                    <Text>Opponent's Guess</Text>
                    <View style={styles.landscapeControls}>
                        <MainButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name="md-remove" size={24} color='#fff' />
                        </MainButton>
                        <NumberContainer>{currentGuess}</NumberContainer>  
                        <MainButton onPress={() => nextGuessHandler('greater')}>
                            <Ionicons name='md-add' size={24} color="white" />
                        </MainButton>
                    </View>
                </View>
    
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color='#fff' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={24} color="white" />
                </MainButton>
            </Card>

            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },

    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },

    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '100%' : '80%',
    },

    list: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end',
    },

    landscapeControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 100,
        marginTop: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
    },

    screenLandscape: {
        flex: 1,
        padding: 10,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    landscapeContainer: {
        width: '40%',
        alignItems: 'center',
    }
})
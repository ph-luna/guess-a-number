import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

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

export default function GameScreen(props) {
    const { userChoice, onGameOver, guessRound } = props
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice))
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const rounds = useRef(0)

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(true)
            guessRound(rounds.current)
        }else{
            rounds.current++
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
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='Lower' onPress={() => nextGuessHandler('lower')} />
                <Button title='Greater' onPress={() => nextGuessHandler('greater')} />
            </Card>
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
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})
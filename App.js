import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

function loadFonts(){
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNum, setUserNum ] = useState()
  const [gameEnd, setGameEnd] = useState(false) 
  const [guessRound, setGuessRound] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return ( 
      <AppLoading 
        startAsync={loadFonts} 
        onFinish={()=> setDataLoaded(true) }/>
    )
  }

  function configureNewGameHandler(){   
    setGameEnd(false)
    setGuessRound(0)
    setUserNum(null)
  }

  function startGameHandler(selectNumber) {
    setUserNum(selectNumber)
  }

  function gameOverHandler(gameOver){
    setGameEnd(gameOver)
  }

  function guessRoundHandler(round){
    setGuessRound(round)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(userNum && !gameEnd){
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} guessRound={guessRoundHandler} />
  }else if(gameEnd){
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNum} onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
        <Header title="Guess a Number" /> 
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
});

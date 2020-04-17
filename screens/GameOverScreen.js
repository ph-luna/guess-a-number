import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

export default function GameOverScreen(props) {
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        function updateLayout(){
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => Dimensions.removeEventListener('change', updateLayout)
    })

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The Game is Over!</TitleText> 
                    <Image 
                        //source={require('../assets/images/original.png')} 
                        source={{ uri: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg' }}
                        style={availableDeviceHeight > 500 ? styles.image : styles.imageLandscape} 
                        resizeMode="cover"
                        fadeDuration={1000} 
                    />
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>
                            Your phone needed 
                            <Text style={styles.highlight}> {props.roundsNumber} </Text> 
                            rounds to guess the number 
                            <Text style={styles.highlight}> {props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <MainButton title='NEW GAME' onPress={props.onRestart} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },

    image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width / 2,
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: Dimensions.get('window').height / 20
    },

    imageLandscape: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: Dimensions.get('window').width * 0.5 / 2,
        borderWidth: 3,
        borderColor: '#000',
        marginVertical: Dimensions.get('window').height / 20
    },

    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },

    resultContainer: {
        width: '80%',
        marginVertical: Dimensions.get('window').height / 60
    },

    resultText:{
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
})
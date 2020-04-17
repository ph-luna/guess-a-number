import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Color from '../constants/colors'
import TitleText from './TitleText'

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerANDROID}) }}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    headerIOS: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },

    headerANDROID: {
        backgroundColor: Color.primary,
        borderBottomWidth: 0,
    }
})

export default Header
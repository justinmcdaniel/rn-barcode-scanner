import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IHeaderProps {
    headerText: string
}

const Header = ({ headerText }: IHeaderProps) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{headerText}</Text>
        </View>
    
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 25
    }
});

export default Header;
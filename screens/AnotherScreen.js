import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnotherScreen = ({navigation}) => {
    return(
        <View style = {styles.mainContainer}> 
            <TouchableOpacity style={styles.button} 
                onPress={()=>{navigation.navigate('Screen1')}}> 
                <Text style={{color: '#ffffff', fontSize: 20}}>HomeScree2</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0000ff',
        padding: 10,
        margin: 40,
        width: 200,
        borderRadius: 35
    }
})

export default AnotherScreen

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { ListItem } from 'react-native-elements'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


class Country extends React.Component{ 
    constructor(){
        super()
        this.arrayholder = []
        this.state = {
            loaded: false,
            error: null,
            data:null,
        }
    }

    searchFilterFunction = (text) => {
        this.setState({
            value: text 
        });   

        const newData = this.arrayholder.filter(item => {
            const itemData = item.Country.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return(
            <SearchBar        
                placeholder="Search for Countries..." 
                containerStyle={{backgroundColor:'#00000000', borderBottomColor:'transparent'}}
                inputContainerStyle={{backgroundColor:'#00000000'}} 
                leftIconContainerStyle={{backgroundColor:'#00000000'}}
                onChangeText={text => { this.searchFilterFunction(text) }}
                value = { this.state.value }
                lightTheme
                autoCorrect={false}             
            />   
        )
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        fetch('https://api.covid19api.com/countries')
            .then(response=>response.json())
            .then(this.showData)
            .catch(this.badStuff)
    }

    showData = (data) => {
        this.setState({
            loaded:true,
            data
        })
        this.arrayholder = data
    }

    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }

    render(){
        if (!this.state.loaded){
            return(
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            )}

        else if (this.state.error){
            return(
                <View>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            )}

        else{
            return(
                <View> 
                    <FlatList
                        keyExtractor={(item)=>item.ISO2}
                        data={this.state.data}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.Country}
                                onPress={()=>{ this.props.navigation.navigate('Country2', {slug: item.Slug})}}
                                containerStyle={{backgroundColor:'#00000000'}}
                                titleStyle={{paddingLeft:20,color:'white', fontSize:20}}
                                chevron
                            />
                        )}
                    />
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    mainContainer:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red'
    }
})

export default Country 

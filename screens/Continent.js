import * as React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ListItem } from 'react-native-elements'

class Continent extends React.Component{
    constructor(props){
        super(props)
        let url = 'https://covid19-update-api.herokuapp.com/api/v1/world/continent/'
        this.state = {
            loaded: false,
            error: null,
            data:[]
        }
    }

    componentDidMount(){
        this.url = 'https://covid19-update-api.herokuapp.com/api/v1/world/continent/' + this.props.route.params.continent
        this.getData()
    }

    getData = () => {
        fetch(this.url)
            .then(response=>response.json())
            .then(this.showData)
            .catch(this.badStuff)
    }

    showData = (data) => {
        this.setState({
            loaded:true,
            data
        })
    }

    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }

    render(){
        if (!this.state.loaded){
            return(
                <View style={{flex:1, justifyContent: 'center', backgroundColor:'#222f3e'}}>
                    <ActivityIndicator />
                </View>
            )}

        else if (this.state.error){
            return(
                <View>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            )}

        else if (this.state.data){
            return(
                <View style={styles.mainContainer}>
                    <FlatList
                        data={this.state.data.countries}
                        keyExtractor={(item)=>item.name}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({ item }) => (
                            <ListItem
                                title={ item.name }
                                containerStyle={{backgroundColor:'#222f3e'}}
                                titleStyle={{paddingLeft:20, color:'white', fontSize:20}}
                                rightTitleStyle={{color:'white'}}
                                rightTitle={'Cases: ' + item.cases }
                                rightSubtitleStyle={{paddingRight:20, color:'white'}}
                                rightSubtitle={'Deaths:' + item.deaths}
                                containerStyle={{backgroundColor:'#00000000'}}
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#222f3e'
    },
    stat: {
        fontSize: 22,
    },
    error: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red'
    },
})

export default Continent

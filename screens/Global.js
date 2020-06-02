import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class Global extends React.Component{
    constructor(){
        super()
        this.state = {
            loaded: false,
            error: null,
            data:null,
        }
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        fetch('https://api.covid19api.com/summary')
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

        else if (this.state.data){
            return(
                <View style={{alignSelf: 'center'}}>
                    <View style={{top:190}}>
                        <Text style={{fontSize:42, fontWeight:'bold', color:'white'}}>GLOBAL</Text>
                        <Text style={{fontSize:42, fontWeight:'bold', color:'white'}}>STATISTICS</Text>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={{paddingRight:70}}>
                            <Text style={styles.stat}>New Confirmed:</Text>
                            <Text style={styles.stat}>Total Deaths:</Text>
                            <Text style={styles.stat}>New Deaths:</Text>
                            <Text style={styles.stat}>Total Deaths:</Text>
                            <Text style={styles.stat}>New Recovered:</Text>
                            <Text style={styles.stat}>Total Recovered:</Text>
                        </View>
                        <View style={{paddingLeft:70}}>
                            <Text style={styles.stat}>{ this.state.data.Global.NewConfirmed }</Text>
                            <Text style={styles.stat}>{ this.state.data.Global.TotalDeaths }</Text>
                            <Text style={styles.stat}>{ this.state.data.Global.NewDeaths }</Text>
                            <Text style={styles.stat}>{ this.state.data.Global.TotalDeaths }</Text>
                            <Text style={styles.stat}>{ this.state.data.Global.NewRecovered }</Text>
                            <Text style={styles.stat}>{ this.state.data.Global.TotalRecovered }</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainer:  {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stat: {
        fontSize: 22,
        color: '#c8d6e5'
    },
    error: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red'
    },
})

export default Global 

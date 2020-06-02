import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class Country2 extends React.Component{
    constructor(){
        super()
        let url = null 
        this.state = {
            loaded: false,
            error: null,
            data:[]
        }
    }

    componentDidMount(){
        this.url = 'https://api.covid19api.com/total/dayone/country/' + this.props.route.params.slug
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
                <View style={{flex:1,justifyContent:'center'}}>
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
                    <View style={{top:200}}>
                        <Text style={{fontSize:42, fontWeight:'bold', color:'white', paddingBottom:20}}>{ this.state.data[0].Country }</Text>
                        <Text style={{fontSize:28, color:'white'}}>DAY ONE STATS</Text>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={{paddingRight:60}}>
                            <Text style={styles.stat}>Date Reported:</Text>
                            <Text style={styles.stat}>Active:</Text>
                            <Text style={{fontSize:28, color:'white', paddingTop:5}}>CURRENT STATS</Text>
                            <Text style={styles.stat}>Total Confirmed:</Text>
                            <Text style={styles.stat}>Total Deaths:</Text>
                            <Text style={styles.stat}>Total Recovered:</Text>
                            <Text style={styles.stat}>Total Active:</Text>
                        </View>
                        <View style={{paddingLeft:60}}>
                            <Text style={styles.stat}>{ this.state.data[0].Date.substring(0,10) }</Text>
                            <Text style={styles.stat}>{ this.state.data[0].Active }</Text>
                            <Text style={{fontSize:28, color:'white', paddingTop:5}}></Text>
                            <Text style={styles.stat}>{ this.state.data[this.state.data.length-1].Confirmed }</Text>
                            <Text style={styles.stat}>{ this.state.data[this.state.data.length-1].Deaths }</Text>
                            <Text style={styles.stat}>{ this.state.data[this.state.data.length-1].Recovered}</Text>
                            <Text style={styles.stat}>{ this.state.data[this.state.data.length-1].Active }</Text>
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

export default Country2 

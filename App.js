import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Country from './screens/Country.js'
import Country2 from './screens/Country2.js'
import Global from './screens/Global.js'
import Continent from './screens/Continent.js'
import AnotherScreen from './screens/AnotherScreen.js'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createMaterialBottomTabNavigator()

const DrawerNav = () => {
    return(
        <Drawer.Navigator 
            drawerStyle={{backgroundColor:'#222f3e'}}
            drawerContentOptions={{
                activeTintColor: '#c8d6e5',
                labelStyle: { color: 'white', fontSize: 16},
            }}
        >
            <Drawer.Screen name="Countries" component={CountryStackNav} />
            <Drawer.Screen name="Global" component={GlobalStackNav} />
            <Drawer.Screen name="Continent" component={ContinentStackNav} />
            <Drawer.Screen name="ExperimentalScreen" component={AnotherScreen} />
        </Drawer.Navigator>
    )
}

const CountryStackNav = () => {
    return(
        <Stack.Navigator 
            screenOptions={ 
                ({ navigation }) => ({
                    cardOverlayEnabled: true,
                        cardStyle: { backgroundColor: '#222f3e' },
                        headerStyle: { backgroundColor: '#54a0ff' },
                        headerTintColor: 'white',
                        headerLeft: () => 
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.openDrawer()}>
                                <Icon
                                    name="bars"
                                    style={{textAlign: 'center', alignSelf: 'center'}}
                                    color="white"
                                    size={22}/>
                            </TouchableOpacity>})
            }>
            <Stack.Screen name="Country" component={Country} options={{title: 'COVID APP'}} />
            <Stack.Screen name="Country2" component={Country2} options={{title: 'DAY ONE STATS'}} />
        </Stack.Navigator>
    )
}

const GlobalStackNav = () => {
    return(
        <Stack.Navigator 
            screenOptions={ 
                ({ navigation }) => ({
                    cardOverlayEnabled: true,
                        cardStyle: { backgroundColor: '#222f3e' },
                        headerStyle: { backgroundColor: '#54a0ff' },
                        headerTintColor: 'white',
                        headerLeft: () => 
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.openDrawer()}>
                                <Icon
                                    name="bars"
                                    style={{textAlign: 'center', alignSelf: 'center'}}
                                    color="white"
                                    size={22}/>
                            </TouchableOpacity>})
            }>
            <Stack.Screen name="Global" component={Global} options={{title: 'GLOBAL STATS'}} />
        </Stack.Navigator>
    )
}

const ContinentStackNav = () => {
    return(
        <Stack.Navigator 
            screenOptions={ 
                ({ navigation }) => ({
                    cardOverlayEnabled: true,
                        cardStyle: { backgroundColor: '#222f3e' },
                        headerStyle: { backgroundColor: '#54a0ff' },
                        headerTintColor: 'white',
                        headerLeft: () => 
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.openDrawer()}>
                                <Icon
                                    name="bars"
                                    style={{textAlign: 'center', alignSelf: 'center'}}
                                    color="white"
                                    size={22}/>
                            </TouchableOpacity>})
            }>
            <Stack.Screen name="Continent" component={MyTabs} initialParams={{continent:'africa'}}/>
        </Stack.Navigator>
    )
}

const MyTabs = () => {
    return (
        <Tab.Navigator
            style={{backgroundColor: '#222f3e'}}
            barStyle={{backgroundColor:'#576574'}}
            shifting={false}>
            <Tab.Screen name="Africa" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-africa' size={23} color='white'/>)}} initialParams={{continent:'africa'}} />
            <Tab.Screen name="Asia" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-asia' size={23} color='white'/>)}} initialParams={{continent:'asia'}}/>
            <Tab.Screen name="Europe" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-europe' size={23} color='white'/>)}} initialParams={{continent:'europe'}}/>
            <Tab.Screen name="N.America" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-americas' size={23} color='white'/>)}} initialParams={{continent:'north%20america'}}/>
            <Tab.Screen name="S. America" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-americas' size={23} color='white'/>)}} initialParams={{continent:'south%20america'}}/>
            <Tab.Screen name="Australia" component={Continent} options={{tabBarIcon:()=> (<Icon name='globe-europe' size={23} color='white'/>)}} initialParams={{continent:'australia'}}/>
        </Tab.Navigator>
    );
}

class App extends React.Component {
    render(){
        return (
            <NavigationContainer>
                <DrawerNav />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF00',
        padding: 12,
    }
})
export default App

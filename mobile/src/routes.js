/**
 *  Utilizaremos o tipo de navegação Stack-Navegation (Como se fosse uma navegação por botões, 
 *  criando uma "pilha" de telas) 
 *  
 *  Doc: https://reactnavigation.org/docs/hello-react-navigation
 * 
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './components/incidents/Incidents'
import Detail from './components/Detail/Detail'

export default function Routes(){
    return(
        <NavigationContainer>
            {/* Header show:false -> retira o cabeçalho da página */}
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
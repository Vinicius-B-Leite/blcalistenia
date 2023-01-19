import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import Historic from '../screens/Historic';
import { useTheme } from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'


const { Navigator, Screen } = createMaterialTopTabNavigator()

const Routes: React.FC = () => {
    const theme = useTheme()
    return (
        <NavigationContainer>
            <Navigator
                tabBarPosition='bottom'
                keyboardDismissMode='on-drag'
                screenOptions={{
                    tabBarIndicatorStyle: { display: 'none' },
                    tabBarStyle: {
                        backgroundColor: theme.colors.darkBackground,
                        height: theme.sizes.tabBar,
                        justifyContent: 'center'
                    },
                    tabBarActiveTintColor: theme.colors.contrast,
                    tabBarShowLabel: false
                }}


            >
                <Screen name='Home' component={Home}
                    options={{
                        tabBarIcon: ({ color }) => <Entypo name='home' size={theme.sizes.icons.md} color={color} />
                    }}

                />
                <Screen name='Dashboard' component={Dashboard}
                    options={{
                        tabBarIcon: ({ color }) => <Entypo name='bar-graph' size={theme.sizes.icons.md} color={color} />
                    }}
                />
                <Screen name='Historic' component={Historic}
                    options={{
                        tabBarIcon: ({ color }) => <Octicons name='history' size={theme.sizes.icons.md} color={color} />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}

export default Routes;
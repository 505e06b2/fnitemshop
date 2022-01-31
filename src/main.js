"use strict";

import { registerRootComponent } from "expo";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Theme from "./theme";
import ItemShop from "./item_shop";

const Stack = createNativeStackNavigator();

function main() {
	const theme = Theme.systemTheme();
	const header_stylesheet = Theme.getHeaderStylesheet(theme);
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{title: 'Welcome', headerTitleStyle: header_stylesheet, headerStyle: header_stylesheet}}>
				<Stack.Screen name="Item Shop" component={ItemShop}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

registerRootComponent(main);

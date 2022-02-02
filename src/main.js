"use strict";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Theme from "./theme";
import ItemShop from "./item_shop";

const Stack = createNativeStackNavigator();

export default function main() {
	const theme = Theme.systemTheme();
	const header_stylesheet = Theme.getHeaderStylesheet(theme);
	const page_stylesheet = Theme.getStylesheet(theme);
	const iso_date = new Date().toISOString().split("T")[0];
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerTitleStyle: header_stylesheet,
				headerStyle: header_stylesheet,
				contentStyle: page_stylesheet
			}}>
				<Stack.Screen name={iso_date} component={ItemShop}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

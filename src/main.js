"use strict";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

global.Fortnite = new (require("./fortnite").default)("bffa4ca4-838726ea-1038cb50-5815af17"); //"secret" lel
global.Theme = require("./theme");
global.last_item_shop_response = {}; //set in shop.js

export default function main() {
	const [fontsLoaded] = useFonts({
		"FNFont": require("../assets/fonts/BurbankBigCondensed-Black.otf"),
	});

	const theme = Theme.systemTheme();
	const header_stylesheet = Theme.getHeaderStylesheet(theme);
	const page_stylesheet = Theme.getStylesheet(theme);
	const tint_colour = Theme.getTintColour(theme);

	return fontsLoaded ? (
		<View style={[{flex: 1}, Theme.getStylesheet(theme)]}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{
					headerTitleStyle: header_stylesheet,
					headerTintColor: tint_colour,
					headerStyle: header_stylesheet,
					contentStyle: page_stylesheet
				}}>
					<Stack.Screen
						name="shop"
						getComponent={() => require("./components/shop").default}
						options={{title: ""}}
					/>
					<Stack.Screen
						name="item"
						getComponent={() => require("./components/item").default}
						options={{title: "ITEM"}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	) : (
		<AppLoading/>
	);
}

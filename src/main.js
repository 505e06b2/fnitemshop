"use strict";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

global.Fortnite = new (require("./fortnite").default)(require("./fn_key").value);
global.Theme = require("./theme");
global.last_item_shop_response = {}; //set in shop.js

export default function main() {
	const [fontsLoaded] = useFonts({
		"FNFont": require("../assets/fonts/BurbankBigCondensed-Black.otf"),
	});

	const theme = Theme.systemTheme();

	return fontsLoaded ? (
		<View style={[{flex: 1}, theme.stylesheet]}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{
					headerTitleStyle: theme.header_stylesheet,
					headerTintColor: theme.tint_colour,
					headerStyle: theme.header_stylesheet,
					contentStyle: theme.stylesheet
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
					<Stack.Screen
						name="image"
						getComponent={() => require("./components/image").default}
						options={{title: "IMAGE"}}
					/>
					<Stack.Screen
						name="about"
						getComponent={() => require("./components/about").default}
						options={{title: "About"}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	) : (
		<AppLoading/>
	);
}

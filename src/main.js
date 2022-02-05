"use strict";

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import * as Theme from "./theme";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

const fortnite = new (require("./fortnite").default)("bffa4ca4-838726ea-1038cb50-5815af17"); //"secret" lel

export default function main() {
	const [fontsLoaded] = useFonts({
		"FNFont": require("../assets/fonts/BurbankBigCondensed-Black.otf"),
	});

	const theme = Theme.systemTheme();
	const header_stylesheet = Theme.getHeaderStylesheet(theme);
	const page_stylesheet = Theme.getStylesheet(theme);
	return fontsLoaded ? (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerTitleStyle: header_stylesheet,
				headerStyle: header_stylesheet,
				contentStyle: page_stylesheet
			}}>
				<Stack.Screen
					name="shop"
					getComponent={() => require("./components/shop").default}
					options={{title: ""}}
					initialParams={{fortnite: fortnite}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	) : (
		<AppLoading/>
	);
}

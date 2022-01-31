"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import * as Theme from "./theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	icon: {
		width: 100,
		height: 100
	}
});

export default function Screen() {
	const theme = Theme.systemTheme();
	return (
		<View style={[styles.container, Theme.getStylesheet(theme)]}>
			<StatusBar style={Theme.getStatusBarTheme(theme)}/>
			<Text style={Theme.getStylesheet(theme)}>LLLoading...</Text>
		</View>
	);
}

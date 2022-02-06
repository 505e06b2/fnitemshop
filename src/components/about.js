"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable, Linking } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		margin: 10
	},

	text: {
		alignItems: "center",
		justifyContent: "center",
		fontSize: 18
	},

	hyperlink: {
		color: "blue",
		textDecorationLine: "underline",
		fontSize: 24
	}
});

export default function Screen({route, navigation}) {
	const theme = Theme.systemTheme();

	return (
		<View style={[styles.container, ]}>
			<StatusBar style={theme.statusbar_theme}/>
			<Pressable onPress={() => Linking.openURL("https://fortniteapi.io")}>
				<Text style={[styles.text, styles.hyperlink, {color: theme.colour === "dark" ? "skyblue" : "blue"}]}>
					FortniteAPI.io
				</Text>
			</Pressable>
			<Text style={[styles.text, theme.stylesheet]}>{
`
Thank you to FortniteAPI.io for letting me (and future devs) use their extensive resources!

To support their team, and allow for apps like this to be made, use code "FNAPI" in the Item Shop! (Sponsored by Epic Games)


`
			}</Text>
		<Text style={[styles.text, theme.stylesheet]}>Made by 505e06b2 with React Native</Text>
		</View>
	);
}

"use strict";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { useState, useEffect } from "react";

/* TODO
- Save button
*/

const styles = StyleSheet.create({
	image: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%"
	}
});

export default function Screen({route, navigation}) {
	const theme = Theme.systemTheme();

	useEffect(() => {
		navigation.setOptions({title: route.params.display_name});
	}, []);

	return (
		<View>
			<StatusBar style={theme.statusbar_theme}/>
			<Image
				source={{uri: route.params.url}}
				style={[
					styles.image,
					{backgroundColor: theme.header_stylesheet.backgroundColor}
				]}
				resizeMode="contain"
			/>
		</View>
	);
}

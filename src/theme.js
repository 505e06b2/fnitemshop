"use strict";

import { StyleSheet, useColorScheme } from "react-native";

export const settings = {
	force_dark_theme: null //true = dark, false = light, null = use system theme
};

export function systemTheme() {
	const theme = useColorScheme();
	if(settings.force_dark_theme !== null) return settings.force_dark_theme ? "dark" : "light";
	return theme;
}

export function useDarkTheme() {
	return systemTheme() === "light" ? false : true;
}

export function getStylesheet(theme_name="dark") {
	return content_theme[theme_name];
}

export function getHeaderStylesheet(theme_name="dark") {
	return header_theme[theme_name];
}

export function getStatusBarTheme(theme_name="dark") {
	return theme_name === "light" ? "dark" : "light"; //text opposite of bg
}

export function getTintColour(theme_name="dark") {
	return header_theme[theme_name].color;
}

const content_theme = StyleSheet.create({
	dark: {
		color: "#eee",
		backgroundColor: "#333",
	},

	light: {
		color: "#000",
		backgroundColor: "#fff"
	}
});

const header_theme = StyleSheet.create({
	dark: {
		color: "#eee",
		backgroundColor: "#444",
	},

	light: {
		color: "#000",
		backgroundColor: "#cff"
	}
});

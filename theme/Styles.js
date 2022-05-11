import styled from "styled-components";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "./AppTheme";
import { TextInput, Button } from "react-native-paper";

const { colors, SIZES } = theme;

export const StyledContainer = styled.View`
	flex: 1;
	padding: 25px;
	background-color: ${colors.white};
`;

export const InnerContainer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
`;

export const PageLogo = styled.Image`
	width: 100px;
	height: 100px;
	margin-bottom: 15px;
`;

export const PageTitle = styled.Text`
	font-size: 30px;
	text-align: center;
	font-weight: bold;
	color: ${colors.primary};
	padding: 10px;
`;

export const SubTitle = styled.Text`
	font-size: 18px;
	text-align: center;
	margin-bottom: 20px;
	letter-spacing: 1px;
	font-weight: bold;
	color: ${colors.tertiary};
`;

export const StyledFormArea = styled.View`
	width: ${SIZES.width - 20}px;
	padding: 16px;
`;

export const StyledInput = styled.TextInput`
	background-color: ${colors.secondary};
	padding: 15px;
	width: 100%;
	border-radius: 5px;
	font-size: 16px;
	height: 60px;
	margin-vertical: 3px;
	margin-bottom: 15px;
	color: ${colors.tertiary};
`;

export const StyledInputLabel = styled.Text`
	color: ${colors.tertiary};
	font-size: 14px;
	text-align: left;
`;
export const LeftIcon = styled.View`
	left: 15px;
	top: 43px;
	position: absolute;
	z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
	right: 15px;
	top: 38px;
	position: absolute;
	z-index: 1;
`;

export const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 16px;
	text-transform: uppercase;
`;

export const MsgBox = styled.Text`
	text-align: center;
	font-size: 14px;
	color: ${(props) => (props.type == "SUCCESS" ? colors.green : colors.red)};
`;

export const Line = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${colors.darkLight};
	margin-vertical: 10px;
`;

export const ExtraView = styled.View`
	justify-content: center;
	flex-direction: row;
	align-items: center;
	padding: 10px;
`;

export const ExtraText = styled.Text`
	justify-content: center;
	align-content: center;
	color: ${colors.tertiary};
	font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`;

export const TextLinkContent = styled.Text`
	color: ${colors.primary};
	font-size: 15px;
`;

export const GlobalStyles = StyleSheet.create({
	flexRowCenter: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: SIZES.padding,
	},
	flexColumnCenter: {
		justifyContent: "center",
		alignItems: "center",
	},
	flexRowStart: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	flexColumnStart: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	formContainer: {
		width: SIZES.width - 20,
		padding: 16,
	},
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: colors.lightGray,
	},
	screenTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.black,
		marginBottom: SIZES.margin2,
	},
	divider: {
		marginVertical: 7,
		borderColor: colors.black,
		height: 5,
		backgroundColor: colors.black,
	},
});

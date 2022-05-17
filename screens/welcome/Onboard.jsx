import { View, Text, ImageBackground, StatusBar, Button, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Routes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { authReset } from "../../app/slices/authSlice";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../theme/AppTheme";
import StyledBtn from "../../theme/uiSinppets/StyledBtn";
import { resetUser } from "../../app/slices/userSlice";
import AppImages from "../../constants/Images";

const OnboardScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authReset());
		dispatch(resetUser());
	}, []);

	const handleContinue = () => {
		navigation.navigate(Routes.customer.location, {
			animate: "slide_from_right",
		});
	};
	const handleRegister = () => {
		navigation.navigate(Routes.auth.cookLogin, {
			animate: "slide_from_right",
		});
	};
	return (
		<>
			<StatusBar barStyle="light-content" />
			<Container>
				<Image source={AppImages.bgImage} resizeMode="cover">
					<Overlay colors={["#00000000", "#000000"]} style={{ height: "100%", width: "100%" }}>
						<Content>
							<View style={{ marginBottom: 60 }}>
								<SubText>Taste our </SubText>
								<HeroText>Home food</HeroText>
								<SubText>right now!</SubText>
							</View>
							<StyledBtn title="Explore" onPress={handleContinue} />
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									marginTop: 15,
								}}
							>
								<SubText>Sign In as Cook?</SubText>
								<Pressable onPress={handleRegister}>
									<LinkText>Cook Login</LinkText>
								</Pressable>
							</View>
						</Content>
					</Overlay>
				</Image>
			</Container>
		</>
	);
};

export default OnboardScreen;

const Container = styled.View`
	flex: 1;
`;

const Overlay = styled(LinearGradient)`
	height: 100%;
	width: 100%;
	justify-content: flex-end;
`;

const Image = styled.ImageBackground`
	position: relative;
`;

const Content = styled.View`
	padding: 50px 16px;
	z-index: 2;
`;

const HeroText = styled.Text`
	font-size: 40px;
	font-weight: bold;
	color: ${theme.colors.secondary};
`;

const SubText = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #fff;
`;

const LinkText = styled.Text`
	font-size: 16px;
	color: ${theme.colors.primary};
	text-align: center;
	padding: 10px;
`;

import { View, Text, Button } from "react-native";
import React from "react";

const OnboardScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate("UserRole");
  };
  return (
    <View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default OnboardScreen;

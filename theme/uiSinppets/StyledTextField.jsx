import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

import theme from "../AppTheme";

const StyledTextField = ({
  label,
  icon,
  setHidePass,
  hidePass,
  isPassword,
  mode,
  ...props
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        label={label}
        mode={mode}
        outlineColor={theme.colors.lightGray}
        {...props}
      />
    </View>
  );
};

export default StyledTextField;

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});

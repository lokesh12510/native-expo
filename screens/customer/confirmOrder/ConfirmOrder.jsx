import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import theme from "../../../theme/AppTheme";
import StyledTextField from "../../../theme/uiSinppets/StyledTextField";
import KeyboardAvoidWrapper from "../../../utils/KeyboardAvoidWrapper";
import { Divider, RadioButton } from "react-native-paper";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";

const { colors } = theme;

const ConfirmOrder = ({ navigation }) => {
  const [address, setAddress] = useState("");

  const handleChange = (text) => {
    setAddress(text);
  };

  const [value, setValue] = React.useState("first");

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Select Delivery Address
          </Text>
          <StyledTextField
            label="New Address"
            placeholder="New Delivery Address"
            mode="outlined"
            onChangeText={handleChange}
            value={address}
          />
          <Divider />
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <RadioButton.Item
              label="812,first floor , Mtp Road, Puthiyavan Nagar, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641002, India"
              value="first"
              color={colors.primary}
            />
            <RadioButton.Item
              label="812,first floor , Mtp Road, Puthiyavan Nagar, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641002, India"
              value="second"
              color={colors.primary}
            />
          </RadioButton.Group>
        </View>
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Items (3)
          </Text>
          {[...new Array(3)].map((item, index) => (
            <View style={styles.orderItem} key={index}>
              <Image
                source={{
                  uri: "https://homecook.csuat.xyz:8000/uploads/food/File_ddf25537-4140-433c-80ef-3fbee084f072.jpg",
                }}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={styles.title}>Biriyani</Text>
                <Text style={styles.qty}>Quantity : 2</Text>
                <Text style={styles.price}>$ 200</Text>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Total :
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              &nbsp; $ 600
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ bottom: -6, paddingHorizontal: 10, paddingVertical: 5 }}>
        <StyledBtn
          title={"Place Order"}
          onPress={() => navigation.navigate(Routes.customer.confirm)}
        />
      </View>
    </>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  wrapper: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 5,
    marginBottom: 7,
  },
  orderItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: colors.lightGray,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 5,
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    marginBottom: 2,
    color: colors.secondary,
    fontWeight: "bold",
  },
  qty: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "bold",
    color: colors.gray,
  },
  totalContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

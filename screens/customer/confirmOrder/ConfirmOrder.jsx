import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import theme from "../../../theme/AppTheme";
import StyledTextField from "../../../theme/uiSinppets/StyledTextField";
import KeyboardAvoidWrapper from "../../../utils/KeyboardAvoidWrapper";
import { Divider, RadioButton } from "react-native-paper";
import StyledBtn from "../../../theme/uiSinppets/StyledBtn";
import { useEffect } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { useSelector } from "react-redux";
import { useGetUserAddressQuery } from "../../../app/services/addressApi";
import { useOrderConfirmMutation } from "../../../app/services/ordersApi";
import { clearCart } from "../../../app/slices/cartSlice";
import { useDispatch } from "react-redux";

const { colors } = theme;

const ConfirmOrder = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cartItems, cartTotalAmount, cartItemsCount } = useSelector(
    (state) => state.cart
  );
  const {
    profile,
    location,
    delivery_address: userAddress,
  } = useSelector((state) => state.user);

  const { isLoading, isError, isSuccess } = useGetUserAddressQuery(profile.id);

  const [orderConfirm, { isLoading: orderStatus, data, isError: orderError }] =
    useOrderConfirmMutation();

  const [address, setAddress] = useState("");

  const handleChange = (text) => {
    setAddress(text);
  };

  const [value, setValue] = React.useState(0);

  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    setAddressList(userAddress);
  }, []);

  const handleAddressList = () => {
    setAddressList((add) => [...add, { delivery_address: address }]);
    setAddress("");
    Keyboard.dismiss();
  };

  const handlePlaceOrder = () => {
    const addressData = {
      user_id: profile.id,
      delivery_address: addressList[value].delivery_address,
      delivery_latitude: location.latitude,
      delivery_longitude: location.longitude,
      default_flag: 1,
    };

    let formData = new FormData();

    formData.append(
      "address",
      JSON.stringify(addressList[value].delivery_address)
    );
    formData.append("payment_status", 1);
    formData.append("payment_type", "Cash");
    formData.append("orderDetail", JSON.stringify(cartItems));
    formData.append("addressData", JSON.stringify(addressData));

    orderConfirm(formData);
    // On order confirm success navigate to success page and clear cart
    if (!isLoading && isSuccess) {
      dispatch(clearCart());
      navigation.navigate("Success");
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
              color: colors.gray,
            }}
          >
            Items ({cartItemsCount})
          </Text>
          {cartItems.map((item, index) => (
            <View style={styles.orderItem} key={item.id}>
              <Image
                source={{
                  uri: item.image_url,
                }}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={styles.title}>{item.food_name}</Text>
                <Text style={styles.qty}>Quantity : {item.u_quantity}</Text>
                <Text style={styles.price}>&#x20B9; {item.u_total}</Text>
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
              &nbsp; &#x20B9; {cartTotalAmount}
            </Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 14,
              color: colors.gray,
            }}
          >
            Add Delivery Address
          </Text>
          <View style={styles.inputContainer}>
            <View style={{ flex: 2 }}>
              <StyledTextField
                label="Add New Address"
                placeholder="New Delivery Address"
                mode="outlined"
                onChangeText={handleChange}
                value={address}
              />
            </View>
            <View>
              <Pressable style={styles.addIcon} onPress={handleAddressList}>
                <MaterialIcons
                  name="add-box"
                  size={40}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </View>
          <Divider />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginVertical: 14,
              color: colors.gray,
            }}
          >
            Select Address
          </Text>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            {!isLoading &&
              isSuccess &&
              addressList.length > 0 &&
              addressList.map((item, index) => {
                return (
                  <RadioButton.Item
                    key={item.id}
                    label={item.delivery_address}
                    value={index}
                    color={colors.primary}
                  />
                );
              })}
          </RadioButton.Group>
        </View>
      </ScrollView>
      <View style={{ bottom: -6, paddingHorizontal: 10, paddingVertical: 5 }}>
        <StyledBtn title={"Place Order"} onPress={handlePlaceOrder} />
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addIcon: {
    padding: 10,
    marginBottom: 15,
  },
});

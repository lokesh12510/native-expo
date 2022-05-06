import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../screens/customer/home/Home";
import Profile from "../screens/customer/profile/Profile";
import Orders from "../screens/customer/orders/Orders";
import Cart from "../screens/customer/cart/Cart";
import { Routes } from "../constants/routes";
import theme, { colors } from "../theme/AppTheme";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import LocationSelect from "../components/LocationSelect";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import { authReset } from "../app/slices/authSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmOrder from "../screens/customer/confirmOrder/ConfirmOrder";
import SuccessScreen from "../screens/customer/confirmOrder/SuccessScreen";
import { clearCart } from "../app/slices/cartSlice";
import { resetUser } from "../app/slices/userSlice";
import LocationScreen from "../screens/customer/location/LocationScreen";

const { primary, darkgray } = theme.colors;

// Side Drawer Navigation
const customerDrawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authReset());
    dispatch(clearCart());
    dispatch(resetUser());
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.sidebarWrapper}>
        <View style={styles.profileImageWrapper}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://lh3.googleusercontent.com/a-/AOh14Gg4uD5GLRsuNd8dgTtIMc8nv3YIgLqrQTLwB0qnZw=s83-c-mo",
            }}
          />
        </View>
        <View>
          <Text style={styles.profileTitle}>Lokesh</Text>
          <Text style={styles.profileSubTitle}>Customer</Text>
        </View>
      </View>
      <Divider style={{ marginBottom: 20 }} />

      <DrawerItemList {...props} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: "row",
          marginHorizontal: 16,
          marginTop: 50,
        }}
      >
        <Pressable
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 32,
            borderRadius: 5,
            backgroundColor: primary,
            justifyContent: "center",
            alignContent: "center",
            elevation: 4,
          }}
          onPress={handleLogout}
          android_ripple={{ color: "#ccc" }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export const CustomerDrawerScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <customerDrawer.Navigator
        screenOptions={{
          drawerActiveTintColor: primary,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <customerDrawer.Screen
          name={Routes.customer.home}
          component={Home}
          options={{
            drawerLabel: Routes.customer.home,
            headerRightContainerStyle: { marginRight: 16 },
            headerTitleContainerStyle: { flexGrow: 2 },
            headerTitle: () => {
              return <LocationSelect />;
            },
            headerRight: ({ color }) => {
              return (
                <Pressable
                  style={styles.profileIconWrapper}
                  onPress={() => navigation.navigate(Routes.customer.profile)}
                >
                  <Image
                    source={{
                      uri: "https://lh3.googleusercontent.com/ogw/ADea4I4MthA1Px3_XdpXyXt8A4Mdd_VYQ3TJKOZh7eTa2A=s32-c-mo",
                    }}
                    style={styles.profileImage}
                  />
                </Pressable>
              );
            },
          }}
        />
        <customerDrawer.Screen name={Routes.customer.cart} component={Cart} />
        <customerDrawer.Screen
          options={{
            drawerLabel: "My Orders",
          }}
          name={Routes.customer.myOrders}
          component={Orders}
        />
      </customerDrawer.Navigator>
    </>
  );
};

// customer Stack

const CustomerStack = createNativeStackNavigator();

export const CustomerStackScreen = () => {
  const { isLocated } = useSelector((state) => state.user);

  return (
    <CustomerStack.Navigator>
      {isLocated ? (
        <>
          <CustomerStack.Screen
            name={"Index"}
            component={CustomerDrawerScreen}
            options={{ headerShown: false }}
          />
          <CustomerStack.Screen
            name={Routes.customer.profile}
            component={Profile}
          />
          <CustomerStack.Screen
            options={{ headerTitle: "Confirm Order" }}
            name={Routes.customer.confirm}
            component={ConfirmOrder}
          />
          <CustomerStack.Screen
            options={{ headerShown: false }}
            name={"Success"}
            component={SuccessScreen}
          />
          <CustomerStack.Screen
            name={"ChangeLocation"}
            options={{ headerTitle: "Change Location" }}
            component={LocationScreen}
          />
        </>
      ) : (
        <CustomerStack.Screen
          name={"Location"}
          options={{ headerTitle: "Select Location", headerShown: false }}
          component={LocationScreen}
        />
      )}
    </CustomerStack.Navigator>
  );
};

// Bottom Tabs Navigation

const customerTabs = createMaterialBottomTabNavigator();
export const CustomerTabsScreen = () => {
  const { itemCount } = useSelector((state) => state.cart);

  return (
    <>
      <customerTabs.Navigator
        activeColor={primary}
        inactiveColor={darkgray}
        barStyle={{
          backgroundColor: "#f1f1f1",
          paddingVertical: 5,
          elevation: 5,
          shadowOffset: { width: 5, height: 10 },
          shadowRadius: 1,
        }}
      >
        <customerTabs.Screen
          name={Routes.customer.home}
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={20} color={color} />
            ),
          }}
        />

        <customerTabs.Screen
          name={Routes.customer.cart}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <View style={{ position: "relative" }}>
                  {itemCount > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: colors.primary,
                        borderRadius: 50,
                        width: 19,
                        height: 19,
                        zIndex: 3,
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center",
                        top: -7,
                        right: -10,
                      }}
                    >
                      <Text style={{ color: "#fff" }}>{itemCount}</Text>
                    </View>
                  )}
                  <AntDesign name="shoppingcart" size={20} color={color} />
                </View>
              );
            },
          }}
        />
        <customerTabs.Screen
          name={Routes.customer.favorites}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="hearto" size={20} color={color} />
            ),
          }}
        />
        <customerTabs.Screen
          name={Routes.customer.profile}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={20} color={color} />
            ),
          }}
        />
      </customerTabs.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  profileIconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  sidebarWrapper: {
    color: "#fff",
    padding: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  profileImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  profileTitle: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  profileSubTitle: {
    fontSize: 14,
    marginBottom: 4,
    color: darkgray,
  },
});

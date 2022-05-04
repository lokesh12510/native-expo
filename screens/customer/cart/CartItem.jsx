import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import theme from "../../../theme/AppTheme";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  addItem,
  reduceItem,
  removeItem,
  updateTimings,
} from "../../../app/slices/cartSlice";
import { Divider } from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import {
  days,
  getCurrentDay,
  getCurrentDayIndex,
  getCurrentPeriod,
  getCurrentPeriodIndex,
  getCurrentTiming,
  getCurrentTimingIndex,
  period,
  timings,
} from "../../../utils/datePicker";
import { timing } from "react-native-reanimated";

const { colors } = theme;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [selectedDay, setSelectedDay] = useState([
    item.u_day,
    getCurrentDayIndex(item.u_day),
  ]);
  const [selectedHour, setSelectedHour] = useState([
    item.u_hour,
    getCurrentTimingIndex(item.u_hour),
  ]);
  const [selectedSession, setSelectedSession] = useState([
    item.u_period,
    getCurrentPeriodIndex(item.u_period),
  ]);

  const addToCart = (item) => {
    dispatch(addItem(item));
  };
  const removeFromCart = (id) => {
    dispatch(removeItem({ id }));
  };
  const reduceFromCart = (id) => {
    if (item.u_quantity > 1) {
      dispatch(reduceItem({ id }));
    } else {
      dispatch(removeItem({ id }));
    }
  };

  const handleDayChange = (id, day) => {
    dispatch(
      updateTimings({
        id: id,
        data: {
          u_day: day,
        },
      })
    );
  };
  const handleHourChange = (id, hour) => {
    dispatch(
      updateTimings({
        id: id,
        data: {
          u_hour: hour,
        },
      })
    );
  };
  const handleSessionChange = (id, session) => {
    dispatch(
      updateTimings({
        id: id,
        data: {
          u_period: session,
        },
      })
    );
  };

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: item.image_url,
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.itemInfo}>
            <Text style={styles.foodTitle}>{item.food_name}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.foodSubTitle}>Breakfast</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text
              style={[
                styles.foodSubTitle,
                { fontSize: 16, color: colors.black },
              ]}
            >
              &#x20B9; {item.price}
            </Text>
          </View>
        </View>
        <View style={styles.flexCenter}>
          <View>
            <Text style={styles.amount}>&#x20B9; {item.u_total}</Text>
          </View>
          <View style={[styles.actionBtns, { borderRadius: 50 }]}>
            <>
              <Pressable
                style={{ paddingHorizontal: 5 }}
                onPress={() => reduceFromCart(item.id)}
              >
                <Ionicons
                  name="ios-remove-circle-sharp"
                  size={27}
                  color={colors.primary}
                />
              </Pressable>
              <Text style={styles.itemCount}>{item?.u_quantity}</Text>
              <Pressable
                style={{ paddingHorizontal: 5 }}
                onPress={() => addToCart(item)}
              >
                <Ionicons
                  name="ios-add-circle"
                  size={27}
                  color={colors.primary}
                />
              </Pressable>
            </>
          </View>
        </View>
      </View>
      <Divider />
      <Text style={{ marginVertical: 10, color: colors.darkgray }}>
        Select Delivery Timings
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 2 }}>
          <View
            style={[
              styles.flexCenter,
              {
                flexDirection: "row",
                padding: 5,
                marginBottom: 5,
                borderWidth: 1,
                borderColor: colors.secondary,
                borderRadius: 7,
              },
            ]}
          >
            <ScrollPicker
              style={{ padding: 0 }}
              dataSource={days}
              selectedIndex={selectedDay[1]}
              renderItem={(data, index) => {
                return (
                  <View>
                    <Text
                      style={[
                        { color: "#ccc" },
                        selectedDay[1] === index && {
                          color: colors.secondary,
                          fontSize: 16,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      {data}
                    </Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                setSelectedDay(
                  [data, selectedIndex],
                  handleDayChange(item.id, data)
                );
              }}
              wrapperHeight={70}
              wrapperWidth={140}
              wrapperColor="#FFFFFF"
              itemHeight={28}
              highlightColor={"#fff"}
              highlightBorderWidth={2}
              activeItemColor={"#222121"}
              itemColor={"#B4B4B4"}
            />
            <ScrollPicker
              style={{ padding: 0 }}
              dataSource={timings}
              selectedIndex={selectedHour[1]}
              renderItem={(data, index) => {
                return (
                  <View>
                    <Text
                      style={[
                        { color: "#ccc" },
                        selectedHour[1] === index && {
                          color: colors.secondary,
                          fontSize: 16,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      {data}
                    </Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                setSelectedHour(
                  [data, selectedIndex],
                  handleHourChange(item.id, data)
                );
              }}
              wrapperHeight={70}
              wrapperWidth={120}
              wrapperColor="#FFFFFF"
              itemHeight={28}
              highlightColor={"#fff"}
              highlightBorderWidth={2}
              activeItemColor={"#222121"}
              itemColor={"#B4B4B4"}
            />
            <ScrollPicker
              style={{ padding: 0 }}
              dataSource={period}
              selectedIndex={selectedSession[1]}
              renderItem={(data, index) => {
                return (
                  <View>
                    <Text
                      style={[
                        { color: "#ccc" },
                        selectedSession[1] === index && {
                          color: colors.secondary,
                          fontSize: 16,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      {data}
                    </Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                setSelectedSession(
                  [data, selectedIndex],
                  handleSessionChange(item.id, data)
                );
              }}
              wrapperHeight={70}
              wrapperWidth={120}
              wrapperColor="#FFFFFF"
              itemHeight={28}
              highlightColor={"#fff"}
              highlightBorderWidth={2}
              activeItemColor={"#222121"}
              itemColor={"#B4B4B4"}
            />
          </View>
        </View>
        <View>
          <Pressable
            style={{ padding: 10, marginLeft: 15 }}
            onPress={() => removeFromCart(item.id)}
          >
            <MaterialIcons name="delete" size={30} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 10,
  },
  itemCount: {
    fontSize: 16,
    color: colors.primary,
    paddingHorizontal: 7,
    fontWeight: "bold",
  },
  imageWrapper: {
    width: 70,
    height: 70,
    overflow: "hidden",
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  content: {
    paddingHorizontal: 10,
    flex: 2,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  foodTitle: {
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  foodSubTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.darkgray,
  },
  actionBtns: {
    flexDirection: "row",
    borderColor: colors.primary,
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 2,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

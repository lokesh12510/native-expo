import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme/AppTheme";
import { addItem, removeItem } from "../../app/slices/cartSlice";

const { colors, SIZES } = theme;

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();

  const [itemCount, setItemCount] = useState(0);

  const addToCart = (item) => {
    dispatch(addItem({ item }));
    setItemCount((count) => count + 1);
  };
  const removeFromCart = (id) => {
    dispatch(removeItem({ id }));
    setItemCount((count) => count > 0 && count - 1);
  };

  return (
    <View>
      <Pressable style={styles.swipeItem} onPress={() => console.log(item)}>
        <View style={styles.foodContentContainer}>
          <View style={[styles.foodType, { borderColor: colors.primary }]}>
            <View
              style={[styles.dot, { backgroundColor: colors.primary }]}
            ></View>
          </View>
          <View style={styles.foodContent}>
            <Text style={styles.foodTitle}>{item.food_name}</Text>
          </View>
          <View style={styles.foodContent}>
            <Text style={styles.foodContentText}>&#x20B9; {item.price}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.extraContent}>
            <View style={styles.extraContentWrapper}>
              <MaterialCommunityIcons
                name="sale"
                size={15}
                color={colors.primary}
              />
              <Text style={styles.offerText}>Combo Offer Available</Text>
            </View>
          </View>
        </View>
        <View style={styles.foodImageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.foodImage}
              source={{
                uri: item.image_url,
              }}
            />
          </View>
          {itemCount > 0 ? (
            <View style={[styles.actionBtns, { borderRadius: 50 }]}>
              <>
                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Ionicons
                    name="ios-remove-circle-sharp"
                    size={27}
                    color={colors.white}
                  />
                </Pressable>
                <Text style={styles.itemCount}>{itemCount}</Text>
                <Pressable onPress={() => addToCart(item)}>
                  <Ionicons
                    name="ios-add-circle"
                    size={27}
                    color={colors.white}
                  />
                </Pressable>
              </>
            </View>
          ) : (
            <View style={[styles.actionBtns, { borderRadius: 10 }]}>
              <>
                <Pressable onPress={() => addToCart(item)}>
                  <Text style={[styles.itemCount, { fontSize: 18 }]}>Add</Text>
                </Pressable>
              </>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  swipeItem: {
    minHeight: 130,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#f1f1f1",
  },
  foodImageContainer: {
    height: 90,
    alignItems: "center",
  },
  imageWrapper: {
    width: 100,
    height: 90,
    borderRadius: 8,
    elevation: 6,
    borderRadius: 7,
    overflow: "hidden",
  },
  foodContentContainer: {
    paddingHorizontal: 8,
    flexGrow: 1,
    flexDirection: "column",
    width: 0,
  },
  foodContent: {
    marginBottom: 5,
  },
  foodTitle: {
    fontSize: 16,
    color: "#2c2b2b",
    fontWeight: "bold",
    flexShrink: 1,
  },
  foodContentText: {
    fontSize: 18,
    color: colors.gray,
    flexWrap: "wrap",
  },
  actionBtns: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    bottom: 20,
    left: 0,
    right: 0,
    padding: 2,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
  },
  itemCount: {
    fontSize: 20,
    color: colors.white,
    paddingHorizontal: 7,
    fontWeight: "bold",
  },
  foodType: {
    width: 15,
    height: 15,
    borderRadius: 4,
    padding: 2,
    borderWidth: 1,
    marginBottom: 7,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  divider: {
    width: "95%",
    height: 1,
    marginVertical: 3,
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
  },
  extraContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  extraContentWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  offerText: {
    fontSize: 13,
    color: colors.primary,
    marginHorizontal: 3,
  },
  addBtn: {
    width: 50,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    bottom: 20,
    zIndex: 2,
    elevation: 7,
  },
  selectedKitchenContainer: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kitchenImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  tabContainer: {
    paddingHorizontal: 16,
    flex: 1,
    // flexDirection: "column",
    // height: 400,
    height: SIZES.height - 45,
  },
  kitchenContent: {
    paddingHorizontal: 10,
    flex: 2,
  },
  kitchenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
    color: colors.black,
  },
  subTitle: {
    fontSize: 14,
    color: colors.black,
  },
  IconBtn: {
    margin: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../theme/AppTheme";
import KitchenCard from "./KitchenCard";
import { useGetKitchensMutation } from "../../app/services/kitchenApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import KitchenSkeleton from "./KitchenSkeleton";

const { colors, SIZES } = theme;

const KitchenList = () => {
  const [getKitchens, { isError, data: kitchenList = [], isLoading }] =
    useGetKitchensMutation();

  const { longitude, latitude } = useSelector((state) => state.user.location);

  // * This hook is called when user focus or return to this screen
  useFocusEffect(
    useCallback(() => {
      getKitchens({
        page: 1,
        perPage: 100,
        latitude: latitude,
        longitude: longitude,
      });
    }, [longitude, latitude])
  );

  return (
    <>
      <View style={[styles.sliderContainer]}>
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitle]}>Popular Kitchen's</Text>
        </View>
        <View style={styles.sliderItemContainer}>
          <>
            <FlatList
              data={kitchenList.list}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => (
                <KitchenCard item={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
              disableIntervalMomentum
              decelerationRate={0}
              snapToInterval={340} //your element width
              snapToAlignment={"center"}
              ListEmptyComponent={<KitchenSkeleton />}
            />
          </>
        </View>
      </View>
    </>
  );
};

export default KitchenList;

const styles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  sectionTitleContainer: {
    paddingVertical: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 10,
    textTransform: "uppercase",
  },
  sliderItemContainer: {
    width: SIZES.width,
    marginVertical: 5,
  },
});

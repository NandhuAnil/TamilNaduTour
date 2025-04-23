import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { categoriesData } from "../constants";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";

const { width, height } = Dimensions.get("window");

export default function Categories() {
  const { translations } = useLanguage();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations("categories")}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>{translations("seeAll")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() =>
              router.push({
                pathname: "/categorylist",
                params: { category: cat.title },
              })
            }
          >
            <Image
              source={{ uri: cat.image }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <Text style={styles.categoryTitle}>{translations(cat.title)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: height * 0.02,
  },
  header: {
    margin: width * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#404040", // text-neutral-700
  },
  seeAllText: {
    fontSize: width * 0.04,
    color: Colors.primary,
  },
  scrollContainer: {
    paddingHorizontal: width * 0.04,
  },
  categoryItem: {
    alignItems: "center",
    gap: height * 0.005,
    marginRight: width * 0.04,
  },
  categoryImage: {
    width: width * 0.2,
    height: width * 0.19,
    borderRadius: (width * 0.2) / 2,
  },
  categoryTitle: {
    color: "#404040",
    fontWeight: "500",
  },
});

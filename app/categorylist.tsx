import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";

const { width, height } = Dimensions.get("window");

interface DestinationItem {
  destination_name: string;
  Category: string;
  Description: string;
  image_url: string;
  Location: string;
  link: string;
}

export default function categorylist() {
  const { language } = useLanguage();
  const API_URL =
  `https://appsail-50025919837.development.catalystappsail.in/api/destinations/${language}`;
  const { category } = useLocalSearchParams(); // Get category from navigation
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getDestinationsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${category}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      setDestinations(data);
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      getDestinationsByCategory(String(category));
    }
  }, [category]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {destinations.length === 0 ? (
        <Text>No destinations found for {category}</Text>
      ) : (
        destinations.map((item, index) => (
          <DestinationCard item={item} key={index} />
        ))
      )}
    </ScrollView>
  );
}
const DestinationCard = ({ item }: { item: DestinationItem }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const shortTextLength = Math.floor(item.Description.length * 0.2);
  const displayText = expanded
    ? item.Description
    : item.Description.slice(0, shortTextLength) + "...";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/destinationpage",
          params: {
            destination_name: item.destination_name,
            Category: item.Category,
            Description: item.Description,
            image_url: item.image_url,
            Location: item.Location,
            link: item.link,
          },
        })
      }
      style={[styles.cardContainer, styles.shadow]}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <TouchableOpacity
        onPress={() => setFavorite(!isFavorite)}
        style={styles.heartButton}
      >
        <MaterialIcons
          name="favorite"
          size={width * 0.05}
          color={isFavorite ? "red" : "white"}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{item.destination_name}</Text>
      <Text style={styles.description}>
        {displayText}{" "}
        {!expanded && (
          <Text
            style={{ color: "#FFD700", fontWeight: "bold" }}
            onPress={() => setExpanded(true)}
          >
            Know more
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.05,
    paddingTop: '20%'
  },
  cardContainer: {
    width: width * 0.44,
    height: width * 0.65,
    padding: width * 0.03,
    justifyContent: "flex-end",
    marginBottom: height * 0.02,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: width * 0.44,
    height: width * 0.65,
    borderRadius: 15,
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradient: {
    width: width * 0.44,
    height: height * 0.15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    bottom: 0,
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 12,
    padding: width * 0.02,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 100,
  },
  title: {
    fontSize: width * 0.04,
    color: "white",
    fontWeight: "600",
  },
  description: {
    fontSize: width * 0.022,
    color: "white",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

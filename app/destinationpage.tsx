import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export default function DestinationScreen() {
  const router = useRouter();
  const {
    destination_name,
    Category,
    Description,
    image_url,
    Location,
    link,
  } = useLocalSearchParams() as Record<string, string>;

  const [isFavorite, setFavorite] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <StatusBar style="light" />

      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Feather name="chevron-left" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFavorite(!isFavorite)}
          style={styles.iconButton}
        >
          <FontAwesome
            name="heart"
            size={28}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.detailsWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.titleRow}>
            <Text style={styles.destinationTitle}>{destination_name}</Text>
          </View>

          <Text style={styles.description}>{Description}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={28}
                color="skyblue"
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoValue}>{Category}</Text>
                <Text style={styles.infoLabel}>Category</Text>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Feather name="map-pin" size={28} color="#f87171" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoValue}>{Location}</Text>
                <Text style={styles.infoLabel}>Location</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: width,
    height: height * 0.55,
  },
  headerContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 999,
  },
  detailsWrapper: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flex: 1,
    marginTop: -56,
  },
  scrollView: {
    flexGrow: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  destinationTitle: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: Colors.primary, // neutral-500
    flex: 1,
  },
  description: {
    fontSize: width * 0.037,
    color: "#374151", // neutral-700
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginTop: 8,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "48%",
  },
  infoTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#404040", // neutral-700
  },
  infoLabel: {
    color: "#525252", // neutral-600
    fontSize: 13,
  },
});

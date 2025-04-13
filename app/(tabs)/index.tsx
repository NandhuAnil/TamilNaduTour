import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Categories from "@/components/Categories";
import Destinations from "@/components/Destinations";
const { width, height } = Dimensions.get('window');

export default function index() {
  const [searchInput, setSearchInput] = useState("");
  const photoURL = "";
  const currentUser = { name: "Lara" };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateAvatarUrl = (name: string) => {
    const firstLetter = name.charAt(0);
    const backgroundColor = getRandomColor();
    const imageSize = 130;
    return `https://ui-avatars.com/api/?background=${backgroundColor}&size=${imageSize}&color=FFF&font-size=0.60&name=${firstLetter}`;
  };

  return (
    <ScrollView style={{}}>
      <View
        style={{
          backgroundColor: Colors.primary,
          padding: 20,
          paddingTop: "15%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 17,
              alignItems: "center",
            }}
          >
            <Image
              source={
                photoURL
                  ? { uri: photoURL }
                  : { uri: generateAvatarUrl(currentUser?.name) }
              }
              style={{ width: 45, height: 45, borderRadius: 99 }}
            />
            <View>
              <Text style={{ fontFamily: "appFont", color: Colors.white }}>
                Hello, 👋
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "appFont-bold",
                  color: Colors.white,
                }}
              >
                {currentUser?.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
        {/* searchBar */}
        <View style={{ marginTop: 15 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              borderWidth: 0.8,
              borderColor: Colors.gray,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 30,
            }}
          >
            <AntDesign name="search1" size={24} color={Colors.white} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={Colors.white}
              cursorColor={Colors.white}
              onChangeText={(value: any) => setSearchInput(value)}
              style={{ width: "100%", color: Colors.white }}
            />
          </View>
        </View>
      </View>
      <View>
        <Categories />
      </View>
      <View>
        <Text style={{ margin: width * 0.05, fontSize: width * 0.04, fontWeight: '600', }}>Explore</Text>
        <Destinations />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

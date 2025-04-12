import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

export default function welcome() {
  return (
    <View style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
      <Image
        source={require("../../assets/images/welcome.png")}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />
      <LinearGradient
        colors={["transparent", "rgba(3,105,161,0.8)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
        />
      <View style={{ padding: 20, paddingBottom: 50 }}>
        <View style={{ gap: 15 }}>
          <Text
            style={{ fontSize: 20, color: Colors.white, fontWeight: "bold" }}
          >
            Traveling made easy
          </Text>
          <Text style={{ fontSize: 14, color: Colors.white, paddingBottom: 20 }}>
            Experience the world's best adventure around the world with us
          </Text>
        </View>
        <TouchableOpacity
          style={{
            margin: "auto",
            padding: 15,
            width: '100%',
            borderRadius: 50,
            backgroundColor: "orange",
            display: "flex",
            alignItems: 'center'
          }}
        >
          <Text
            style={{ fontSize: 20, color: Colors.white, fontWeight: "bold" }}
          >
            Let's Go
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    gradient: {
      position: 'absolute',
      bottom: 0,
      width: width,         // Full screen width
      height: height * 0.6, // 60% of screen height
    },
  });
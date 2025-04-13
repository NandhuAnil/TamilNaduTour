import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { destinationData } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface DestinationItem {
    image: any;
    title: string;
    shortDescription: string;
}

export default function Destinations() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {destinationData.map((item: DestinationItem, index: number) => (
                <DestinationCard item={item} key={index} navigation={navigation} />
            ))}
        </View>
    );
}

const DestinationCard = ({ item, navigation }: { item: DestinationItem; navigation: any }) => {
    const [isFavorite, setFavorite] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item, isFavorite })}
            style={[styles.cardContainer, styles.shadow]}
        >
            <Image source={{uri: item.image}} style={styles.image} />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            <TouchableOpacity
                onPress={() => setFavorite(!isFavorite)}
                style={styles.heartButton}
            >
                <MaterialIcons name="favorite" size={width * 0.05} color={isFavorite ? 'red' : 'white'} />
            </TouchableOpacity>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.shortDescription}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.04,
        paddingBottom: height * 0.05,
    },
    cardContainer: {
        width: width * 0.44,
        height: width * 0.65,
        padding: width * 0.03,
        justifyContent: 'flex-end',
        marginBottom: height * 0.02,
        borderRadius: 35,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: width * 0.44,
        height: width * 0.65,
        borderRadius: 35,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    gradient: {
        width: width * 0.44,
        height: height * 0.15,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        position: 'absolute',
        bottom: 0,
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 12,
        padding: width * 0.02,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 100,
    },
    title: {
        fontSize: width * 0.04,
        color: 'white',
        fontWeight: '600',
    },
    description: {
        fontSize: width * 0.022,
        color: 'white',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

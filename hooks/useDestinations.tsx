import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useLanguage } from './useLanguage';


interface Destination {
  destination_name: string;
  Category: string;
  Description: string;
  image_url: string;
  Location: string;
  link: string;
}

const usePlace = () => {
  const { language } = useLanguage();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // ✅ Get All Destinations
  const getAllDestinations = async () => {
    console.log("Fetching destinations with language:", language);
    setLoading(true);
    try {
      const res = await fetch(`https://appsail-50025919837.development.catalystappsail.in/api/destinations/${language}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch destinations');
      setDestinations(data);
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get Destinations by Category
  const getDestinationsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://appsail-50025919837.development.catalystappsail.in/api/destinations/${language}/${category}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch by category');
      setDestinations(data);
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return {
    destinations,
    loading,
    getAllDestinations,
    getDestinationsByCategory,
  };
};

export default usePlace;

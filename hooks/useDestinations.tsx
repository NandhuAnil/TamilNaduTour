import { useState } from 'react';
import { ToastAndroid } from 'react-native';

const API_URL = 'https://appsail-50025919837.development.catalystappsail.in/api/destinations';

interface Destination {
  destination_name: string;
  Category: string;
  Description: string;
  image_url: string;
  Location: string;
  link: string;
}

const usePlace = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Get All Destinations
  const getAllDestinations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}`);
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
      const res = await fetch(`${API_URL}/${category}`);
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

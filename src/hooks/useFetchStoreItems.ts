import { useState, useCallback } from "react";

type storeItemType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

const useFetchStoreItems = () => {
  const [storeItems, setStoreItems] = useState<storeItemType[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-http-4d4cd-default-rtdb.firebaseio.com/storeItems.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      let arr = [];
      for (const key in data) {
        arr.push(data[key]);
      }

      setStoreItems(arr);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  return {
    sendRequest,
    storeItems,
    isLoading,
    error,
  };
};

export default useFetchStoreItems;

import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import DUMMY from "../data/items.json";

type storeItemType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

const Store: React.FC = () => {
  const [storeItems, setStoreItems] = useState<storeItemType[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState(null);

  const fetchStoreItemsData = useCallback(async () => {
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

      console.log(arr);
      setStoreItems(arr);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStoreItemsData();
  }, [fetchStoreItemsData]);

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (isLoading && !error) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className={"g-3"}>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;

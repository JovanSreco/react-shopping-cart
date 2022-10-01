import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import DUMMY from "../data/items.json";
import useFetchStoreItems from "../hooks/useFetchStoreItems";

type storeItemType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

const Store: React.FC = () => {
  const { sendRequest, storeItems, isLoading, error } = useFetchStoreItems();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

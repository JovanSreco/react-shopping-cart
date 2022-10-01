import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import useFetchStoreItems from "../hooks/useFetchStoreItems";

const Store: React.FC = () => {
  const { sendRequest, storeItems, isLoading, error } = useFetchStoreItems();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (isLoading && !error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "10rem", width: "100%" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
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

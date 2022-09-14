import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

const storeItems = [
  {
    id: 1,
    name: "Book",
    price: 10.99,
    imgUrl:
      "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1342&q=80",
  },
  {
    id: 2,
    name: "Computer",
    price: 1199,
    imgUrl:
      "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1342&q=80",
  },
  {
    id: 3,
    name: "Banana",
    price: 1.05,
    imgUrl:
      "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1342&q=80",
  },
  {
    id: 4,
    name: "Car",
    price: 14000,
    imgUrl:
      "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1342&q=80",
  },
];

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} classname={"g-3"}>
        {storeItems.map((item) => (
          <Col key={item.id} className="mb-3">
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;

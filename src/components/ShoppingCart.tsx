import { useEffect } from "react";
import { Offcanvas, Stack, Spinner } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import useFetchStoreItems from "../hooks/useFetchStoreItems";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";
// import CartItem from "./CartItem";

type Props = {
  isOpen: Boolean;
};

const ShoppingCart: React.FC<Props> = ({ isOpen }) => {
  const {
    cartItems,
    closeCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { sendRequest, storeItems, error, isLoading } = useFetchStoreItems();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return (
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="text-center">{error}</p>;
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  if (isLoading && !error) {
    return (
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "10rem", width: "100%" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={4}>
          {cartItems.map((cartItem) => {
            const storeItem = storeItems.find(
              (item) => item.id === cartItem.id
            );

            if (!storeItem) {
              return;
            }

            const quantity = cartItem.quantity;
            return (
              <CartItem
                key={storeItem.id}
                id={storeItem.id}
                imgUrl={storeItem.imgUrl}
                name={storeItem.name}
                price={storeItem.price}
                quantity={quantity}
                decreaseCartQuantity={decreaseCartQuantity}
                increaseCartQuantity={increaseCartQuantity}
                removeFromCart={removeFromCart}
              ></CartItem>
            );
          })}
          <div className="fw-bold fs-4">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;

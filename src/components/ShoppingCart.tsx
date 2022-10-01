import { useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import useFetchStoreItems from "../hooks/useFetchStoreItems";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: Boolean;
};

const ShoppingCart: React.FC<ShoppingCartProps> = (props) => {
  const { sendRequest, storeItems, error } = useFetchStoreItems();
  const bla = storeItems;
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const { closeCart, cartItems } = useShoppingCart();

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={4}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="fw-bold fs-4">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = bla.find((item) => item.id === cartItem.id);
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

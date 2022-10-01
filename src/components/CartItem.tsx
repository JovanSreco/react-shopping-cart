import { useEffect } from "react";
import { Stack, Button } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import useFetchStoreItems from "../hooks/useFetchStoreItems";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const { sendRequest, storeItems, isLoading, error } = useFetchStoreItems();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const { id, quantity } = props;
  const { decreaseCartQuantity, increaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const itemInfo = storeItems.find((item) => item.id === id);
  if (itemInfo == null) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={itemInfo.imgUrl}
        className="rounded-2"
        style={{
          width: "150px",
          height: "100px",
          objectFit: "cover",
        }}
      />

      <Stack gap={2}>
        <div className="text-center">
          <div>
            {itemInfo.name}{" "}
            {quantity > 1 && (
              <span style={{ fontSize: ".9rem" }}>x{quantity}</span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(itemInfo.price)}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button className="m-2" onClick={() => decreaseCartQuantity(id)}>
            -
          </Button>
          <Button className="m-2" onClick={() => increaseCartQuantity(id)}>
            +
          </Button>
          <Button
            className="m-2"
            variant="danger"
            onClick={() => removeFromCart(id)}
          >
            x
          </Button>
        </div>
      </Stack>
    </Stack>
  );
};

export default CartItem;

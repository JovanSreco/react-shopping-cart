import { Stack, Button } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = (props) => {
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
      <div className="me-auto">
        <div>
          {itemInfo.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(itemInfo.price)}
        </div>
      </div>
      <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
      <Button onClick={() => increaseCartQuantity(id)}>+</Button>
      <Button variant="danger" onClick={() => removeFromCart(id)}>
        x
      </Button>
    </Stack>
  );
};

export default CartItem;

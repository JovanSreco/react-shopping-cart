import { Stack, Button, Spinner } from "react-bootstrap";
import useShoppingCart from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

type Props = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
  removeFromCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
};

const CartItem: React.FC<Props> = ({
  id,
  imgUrl,
  name,
  price,
  quantity,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
}) => {
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={imgUrl}
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
            {name}{" "}
            {quantity > 1 && (
              <span style={{ fontSize: ".9rem" }}>x{quantity}</span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(price)}
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

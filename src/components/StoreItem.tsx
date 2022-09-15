import { Card, Button } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";
import useShoppingCart from "../context/ShoppingCartContext";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem: React.FC<storeItemProps> = (props) => {
  const { id, name, price, imgUrl } = props;
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-3">{name}</span>
          <span className="text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button
            onClick={() => increaseCartQuantity(id)}
            className="w-100 mt-3"
          >
            + Add to Cart
          </Button>
        ) : (
          <div className="d-flex align-items-center flex-column">
            <div
              className="d-flex align-items-center justi-content-center mb-2"
              style={{ gap: "0.4rem" }}
            >
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </div>
            <div className="mb-2">
              <span className="fs-3">{quantity}</span>in cart
            </div>
            <Button
              onClick={() => removeFromCart(id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StoreItem;

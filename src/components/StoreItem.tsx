import { Card, Button } from "react-bootstrap";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem: React.FC<storeItemProps> = (props) => {
  const quantity = 1;
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={props.imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-3">{props.name}</span>
          <span className="text-muted">${props.price}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button className="w-100 mt-3">+ Add to Cart</Button>
        ) : (
          <div className="d-flex align-items-center flex-column">
            <div
              className="d-flex align-items-center justi-content-center mb-2"
              style={{ gap: "0.4rem" }}
            >
              <Button>-</Button>
              <div>
                <span className="fs-3">1</span>in cart
              </div>
              <Button>+</Button>
            </div>
            <Button variant="danger" size="sm">
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StoreItem;

import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  removeFromCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export default useShoppingCart;

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id) == null) {
        return [...prevItems, { id, quantity: 1 }];
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id)?.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

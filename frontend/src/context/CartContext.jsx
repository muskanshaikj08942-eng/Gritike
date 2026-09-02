
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("gritike-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "gritike-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const selectedSize = product.selectedSize || "One Size";
      const quantityToAdd = product.quantity || 1;

      // Same product + same size = increase quantity
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item
        );
      }

      // New product / different size
      return [
        ...currentItems,
        {
          ...product,
          selectedSize,
          quantity: quantityToAdd,
        },
      ];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (productId, selectedSize) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  // INCREASE QUANTITY
  const increaseQuantity = (productId, selectedSize) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId &&
        item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (productId, selectedSize) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId &&
          item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL NUMBER OF ITEMS
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


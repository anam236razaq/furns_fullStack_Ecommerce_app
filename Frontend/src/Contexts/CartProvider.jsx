import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";


const CartContext = createContext();

function CartProvider({children}){
  const [cartItems, setCartItems] = useState(()=> {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart? JSON.parse(savedCart) : [];
  });

  useEffect (()=> {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
      setCartItems((prevItems)=> {
        const existingItem = prevItems.find(item => item.id === product.id);
        if(existingItem){
          return prevItems.map(item => item.id === product.id ? {...item, quantity: item.quantity+product.quantity} : item)
        }
        return [...prevItems, product];
      });
  }

  const increaseQuantity = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => item.id === id && item.quantity < item.stock ?
        {...item, quantity: item.quantity+1} : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item => item.id === id && item.quantity > 1 ?
        {...item, quantity: item.quantity -1 } : item
      )
    );
  }

  const removeFromCart = (productId)=> {
    setCartItems((prevItems)=> prevItems.filter(item => item.id !== productId ));

    const productToRemove = cartItems.find((item)=> item.id === productId);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer,
        toast.onmouseleave = Swal.resumeTimer
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Successfully Removed!',
      text: `${productToRemove.name} is removed from cart`,
    });
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const grandTotal = cartItems.reduce((total, item)=> {
    const itemTotal = (item.salePrice || item.price)*item.quantity;
    return itemTotal+total;
  }, 0);

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, 
      clearCart, grandTotal}}>{children}</CartContext.Provider>
  )
}

function UseCart(){
  const context = useContext(CartContext);
  if(context === undefined) throw new Error('CartContext is used outside of Cart Provider');
  return context;
}

export {CartProvider, UseCart}
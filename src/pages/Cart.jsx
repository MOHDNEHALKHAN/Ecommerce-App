import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [showPopup, setShowPopup] = useState(false)

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = () => {
    clearCart()
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 4000)
  }

  return (
    <div className="cart">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={handleCheckout}>Checkout</button>
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  )
}

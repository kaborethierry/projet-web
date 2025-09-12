import './Cart.css'

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Votre Panier</h1>
          </div>
          <div className="empty-cart">
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos produits et ajoutez-les à votre panier !</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Votre Panier</h1>
          <button className="btn btn-danger" onClick={clearCart}>
            Vider le panier
          </button>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-total">
            <h3>Total: {formatPrice(total)}</h3>
          </div>
          <button className="btn btn-primary checkout-btn">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
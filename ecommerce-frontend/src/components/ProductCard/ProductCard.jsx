import './ProductCard.css'

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-category">{product.category}</p>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => onViewDetails(product)}>
            Voir détails
          </button>
          <button className="btn btn-secondary" onClick={() => onAddToCart(product)}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
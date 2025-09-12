import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'

const ProductList = ({ products, onViewDetails, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
import { useState } from 'react'
import ProductList from '../../components/ProductList/ProductList'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import SearchBar from '../../components/SearchBar/SearchBar'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import './Home.css'

const Home = ({ products, categories, addToCart, onEditProduct, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsOpen(false)
    setSelectedProduct(null)
  }

  const handleEdit = (editedProduct) => {
    if (onEditProduct) {
      onEditProduct(editedProduct)
    }
    handleCloseDetails()
  }

  const handleDelete = (productId) => {
    if (onDeleteProduct) {
      onDeleteProduct(productId)
    }
    handleCloseDetails()
  }

  return (
    <div className="home">
      <div className="container">
        <div className="home-header">
          <h1>Bienvenue sur MaBoutique</h1>
          <p>Découvrez nos produits exceptionnels</p>
        </div>

        <div className="filters">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>

        <div className="products-section">
          <h2>Nos produits</h2>
          <ProductList 
            products={filteredProducts} 
            onViewDetails={handleViewDetails}
            onAddToCart={addToCart}
          />
        </div>

        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            isOpen={isDetailsOpen}
            onClose={handleCloseDetails}
            isAdmin={false}
            onAddToCart={addToCart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default Home
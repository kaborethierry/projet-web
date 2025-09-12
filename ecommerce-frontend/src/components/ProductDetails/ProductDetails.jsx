import { useState } from 'react'
import './ProductDetails.css'

const ProductDetails = ({ product, isOpen, onClose, isAdmin, onEdit, onDelete, onAddToCart }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState({...product})

  if (!isOpen) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  const handleSave = () => {
    onEdit({
      ...editedProduct,
      price: parseInt(editedProduct.price)
    })
    setIsEditing(false)
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddToCart = () => {
    onAddToCart(product)
    onClose()
  }

  const handleCancelEdit = () => {
    setEditedProduct({...product})
    setIsEditing(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        {isEditing ? (
          <div className="edit-form">
            <h2>Modifier le produit</h2>
            <div className="form-group">
              <label>Nom:</label>
              <input 
                type="text" 
                name="name" 
                value={editedProduct.name} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Prix (FCFA):</label>
              <input 
                type="number" 
                name="price" 
                value={editedProduct.price} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea 
                name="description" 
                value={editedProduct.description} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Catégorie:</label>
              <input 
                type="text" 
                name="category" 
                value={editedProduct.category} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input 
                type="text" 
                name="image" 
                value={editedProduct.image} 
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Enregistrer
              </button>
              <button className="btn" onClick={handleCancelEdit}>
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="product-details">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p className="price">{formatPrice(product.price)}</p>
                <p className="category">Catégorie: {product.category}</p>
                <p className="description">{product.description}</p>
                <button className="btn btn-secondary" onClick={handleAddToCart}>
                  Ajouter au panier
                </button>
              </div>
            </div>
            
            {isAdmin && (
              <div className="admin-actions">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Modifier
                </button>
                <button className="btn btn-danger" onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
                    onDelete(product.id)
                    onClose()
                  }
                }}>
                  Supprimer
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
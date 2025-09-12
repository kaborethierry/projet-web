import { useState } from 'react'
import './AdminPanel.css'

const AdminPanel = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      console.log('Ajout du produit:', newProduct)
      await onAddProduct({
        ...newProduct,
        price: parseInt(newProduct.price)
      })
      
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      })
      setIsAdding(false)
      alert('Produit ajouté avec succès!')
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error)
      alert('Erreur lors de l\'ajout du produit: ' + error.message)
    }
  }

  const handleEditClick = (product) => {
    console.log('Modification du produit:', product)
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image
    })
  }

  const handleSaveEdit = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      console.log('Sauvegarde des modifications:', {
        original: editingProduct,
        modifications: newProduct
      })

      const productToUpdate = {
        ...editingProduct,
        name: newProduct.name,
        price: parseInt(newProduct.price),
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image
      }

      console.log('Données envoyées à onEditProduct:', productToUpdate)

      await onEditProduct(productToUpdate)
      
      setEditingProduct(null)
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      })
    } catch (error) {
      console.error('Erreur détaillée lors de la modification:', error)
      alert('Erreur lors de la modification du produit. Voir la console pour plus de détails.')
    }
  }

  const handleCancelEdit = () => {
    console.log('Annulation de la modification')
    setEditingProduct(null)
    setNewProduct({
      name: '',
      price: '',
      description: '',
      category: '',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    })
  }

  const handleCancelAdd = () => {
    console.log('Annulation de l\'ajout')
    setIsAdding(false)
    setNewProduct({
      name: '',
      price: '',
      description: '',
      category: '',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewProduct(prev => ({
          ...prev,
          image: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Panneau d'administration</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            console.log('Ouverture du formulaire d\'ajout')
            setEditingProduct(null)
            setIsAdding(true)
            setNewProduct({
              name: '',
              price: '',
              description: '',
              category: '',
              image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            })
          }}
        >
          Ajouter un produit
        </button>
      </div>

      {/* Modal pour l'ajout */}
      {isAdding && !editingProduct && (
        <div className="modal-overlay" onClick={handleCancelAdd}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCancelAdd}>×</button>
            <h2>Ajouter un nouveau produit</h2>
            <div className="form-group">
              <label>Nom:*</label>
              <input 
                type="text" 
                name="name" 
                value={newProduct.name} 
                onChange={handleChange}
                placeholder="Nom du produit"
                required
              />
            </div>
            <div className="form-group">
              <label>Prix (FCFA):*</label>
              <input 
                type="number" 
                name="price" 
                value={newProduct.price} 
                onChange={handleChange}
                placeholder="Prix en FCFA"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea 
                name="description" 
                value={newProduct.description} 
                onChange={handleChange}
                placeholder="Description du produit"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Catégorie:*</label>
              <select 
                name="category" 
                value={newProduct.category} 
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Maison">Maison</option>
                <option value="Sport">Sport</option>
                <option value="Beauté">Beauté</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input 
                type="text" 
                name="image" 
                value={newProduct.image} 
                onChange={handleChange}
                placeholder="URL de l'image"
              />
            </div>
            <div className="form-group">
              <label>Ou télécharger une image:</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {newProduct.image && (
              <div className="image-preview">
                <img src={newProduct.image} alt="Aperçu" />
              </div>
            )}
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleAddProduct}>
                Ajouter le produit
              </button>
              <button className="btn btn-secondary" onClick={handleCancelAdd}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour la modification */}
      {editingProduct && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCancelEdit}>×</button>
            <h2>Modifier le produit</h2>
            <div className="form-group">
              <label>Nom:*</label>
              <input 
                type="text" 
                name="name" 
                value={newProduct.name} 
                onChange={handleChange}
                placeholder="Nom du produit"
                required
              />
            </div>
            <div className="form-group">
              <label>Prix (FCFA):*</label>
              <input 
                type="number" 
                name="price" 
                value={newProduct.price} 
                onChange={handleChange}
                placeholder="Prix en FCFA"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea 
                name="description" 
                value={newProduct.description} 
                onChange={handleChange}
                placeholder="Description du produit"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Catégorie:*</label>
              <select 
                name="category" 
                value={newProduct.category} 
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Maison">Maison</option>
                <option value="Sport">Sport</option>
                <option value="Beauté">Beauté</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input 
                type="text" 
                name="image" 
                value={newProduct.image} 
                onChange={handleChange}
                placeholder="URL de l'image"
              />
            </div>
            <div className="form-group">
              <label>Ou télécharger une image:</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {newProduct.image && (
              <div className="image-preview">
                <img src={newProduct.image} alt="Aperçu" />
              </div>
            )}
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Enregistrer les modifications
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="products-list">
        <h3>Produits existants ({products.length})</h3>
        <div className="admin-products">
          {products.map(product => (
            <div key={product.id} className="admin-product-item">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="product-price">{formatPrice(product.price)}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
              </div>
              <div className="product-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleEditClick(product)}
                >
                  Modifier
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
                      console.log('Suppression du produit:', product.id)
                      onDeleteProduct(product.id)
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
import { useState, useEffect } from 'react'
import AdminPanel from '../../components/AdminPanel/AdminPanel'
import './Admin.css'

const Admin = ({ products, onAddProduct, onEditProduct, onDeleteProduct, isAdmin }) => {
  const [adminProducts, setAdminProducts] = useState(products)

  // Mettre à jour les produits admin quand les produits changent
  useEffect(() => {
    setAdminProducts(products)
  }, [products])

  if (!isAdmin) {
    return (
      <div className="admin-auth-required">
        <div className="container">
          <h2>Accès non autorisé</h2>
          <p>Vous devez être connecté en tant qu'administrateur pour accéder à cette page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <AdminPanel 
          products={adminProducts}
          onAddProduct={onAddProduct}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </div>
  )
}

export default Admin
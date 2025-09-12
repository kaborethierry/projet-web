import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Admin from './pages/Admin/Admin'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Cart from './pages/Cart/Cart'
import './App.css'

// URL de base de l'API Laravel
const API_BASE_URL = 'http://localhost:8000/api'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'
  })
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Sauvegarder le panier dans le localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`)
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
          
          // Extraire les catégories uniques
          const uniqueCategories = [...new Set(data.map(product => product.category))]
          setCategories(uniqueCategories)
        } else {
          console.error('Erreur lors de la récupération des produits')
          // Fallback aux données mockées en cas d'erreur
          setMockData()
        }
      } catch (error) {
        console.error('Erreur réseau:', error)
        setMockData()
      } finally {
        setIsLoading(false)
      }
    }

    const setMockData = () => {
      const mockProducts = [
        {
          id: 1,
          name: "Smartphone XYZ",
          price: 199999,
          description: "Un smartphone haut de gamme avec un appareil photo exceptionnel.",
          category: "Électronique",
          image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 2,
          name: "T-shirt Premium",
          price: 24999,
          description: "Un t-shirt en coton de haute qualité, confortable et stylé.",
          category: "Vêtements",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
      ]
      setProducts(mockProducts)
      const uniqueCategories = [...new Set(mockProducts.map(product => product.category))]
      setCategories(uniqueCategories)
    }

    fetchProducts()
  }, [])

  // Appliquer le thème sombre au body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const handleAdminLogin = () => {
    setIsAdmin(true)
    localStorage.setItem('isAdmin', 'true')
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.setItem('isAdmin', 'false')
    localStorage.removeItem('authToken')
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    alert(`${product.name} ajouté au panier!`)
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      })

      if (response.ok) {
        const createdProduct = await response.json()
        setProducts(prev => [...prev, createdProduct.product])
        return createdProduct.product
      } else {
        console.error('Erreur lors de l\'ajout du produit')
        alert('Erreur lors de l\'ajout du produit')
      }
    } catch (error) {
      console.error('Erreur réseau:', error)
      alert('Erreur réseau lors de l\'ajout du produit')
    }
  }

  const handleEditProduct = async (editedProduct) => {
    try {
      const token = localStorage.getItem('authToken')
      
      // Préparer les données pour l'API
      const productData = {
        name: editedProduct.name,
        price: parseInt(editedProduct.price),
        description: editedProduct.description,
        category: editedProduct.category,
        image: editedProduct.image
      };

      console.log('Envoi des données de modification:', {
        productId: editedProduct.id,
        data: productData
      });

      const response = await fetch(`${API_BASE_URL}/admin/products/${editedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const responseData = await response.json();
      console.log('Réponse du serveur:', responseData);

      if (response.ok) {
        // Mettre à jour l'état local avec le produit modifié
        const updatedProducts = products.map(product =>
          product.id === editedProduct.id ? { ...product, ...productData } : product
        );
        setProducts(updatedProducts);
        
        alert('Produit modifié avec succès!');
        return responseData.product;
      } else {
        console.error('Erreur backend:', responseData);
        alert(responseData.message || 'Erreur lors de la modification du produit');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      alert('Erreur lors de la modification du produit: ' + error.message);
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setProducts(prev => prev.filter(product => product.id !== productId))
        alert('Produit supprimé avec succès')
      } else {
        console.error('Erreur lors de la suppression du produit')
        alert('Erreur lors de la suppression du produit')
      }
    } catch (error) {
      console.error('Erreur réseau:', error)
      alert('Erreur réseau lors de la suppression du produit')
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <Navbar 
          isAdmin={isAdmin} 
          onAdminLogin={handleAdminLogin}
          onAdminLogout={handleAdminLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home products={products} categories={categories} addToCart={addToCart} />} />
            <Route path="/products" element={<Products products={products} categories={categories} addToCart={addToCart} />} />
            <Route path="/admin" element={<Admin products={products} onAddProduct={handleAddProduct} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} isAdmin={isAdmin} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
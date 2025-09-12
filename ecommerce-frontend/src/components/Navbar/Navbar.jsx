import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ isAdmin, onAdminLogin, onAdminLogout, darkMode, setDarkMode, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Connexion avec l'API Laravel
      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authData.email,
            password: authData.password
          })
        })

        const data = await response.json()

        if (response.ok) {
          // Stocker le token et les informations d'authentification
          localStorage.setItem('authToken', data.token)
          localStorage.setItem('isAdmin', 'true')
          localStorage.setItem('user', JSON.stringify(data.user))
          
          onAdminLogin()
          setShowAuthForm(false)
          setAuthData({ email: '', password: '', name: '' })
          alert('Connexion admin réussie!')
        } else {
          alert(data.message || 'Email ou mot de passe incorrect')
        }
      } catch (error) {
        console.error('Erreur réseau:', error)
        alert('Erreur de connexion au serveur')
      }
    } else {
      // Inscription
      try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: authData.name,
            email: authData.email,
            password: authData.password,
            password_confirmation: authData.password
          })
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem('authToken', data.token)
          localStorage.setItem('isAdmin', 'true')
          localStorage.setItem('user', JSON.stringify(data.user))
          
          onAdminLogin()
          setShowAuthForm(false)
          setAuthData({ email: '', password: '', name: '' })
          alert('Administrateur enregistré avec succès!')
        } else {
          alert(data.message || 'Erreur lors de l\'inscription')
        }
      } catch (error) {
        console.error('Erreur réseau:', error)
        alert('Erreur de connexion au serveur')
      }
    }
  }

  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem('authToken')
      
      // Appeler l'API de déconnexion
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Nettoyer le localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('user')
      
      onAdminLogout()
      setIsMenuOpen(false)
      alert('Déconnexion réussie!')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAuthData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const closeAuthModal = () => {
    setShowAuthForm(false)
    setAuthData({ email: '', password: '', name: '' })
    setIsLogin(true)
  }

  return (
    <>
      <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>MaBoutique</Link>
            </div>
            
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>Produits</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
              <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
                🛒 Panier ({cartCount})
              </Link>
            </div>

            <div className="nav-actions">
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème">
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="nav-auth">
                {isAdmin ? (
                  <button className="btn btn-danger" onClick={handleAdminLogout}>
                    Déconnexion
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setShowAuthForm(true)}>
                    Admin
                  </button>
                )}
              </div>

              <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showAuthForm && (
        <div className="auth-modal-overlay" onClick={closeAuthModal}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeAuthModal}>×</button>
            <h2>{isLogin ? 'Connexion Admin' : 'Inscription Admin'}</h2>
            <form onSubmit={handleAuthSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Nom:</label>
                  <input
                    type="text"
                    name="name"
                    value={authData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom complet"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={authData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="admin@example.com"
                />
              </div>
              <div className="form-group">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  value={authData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre mot de passe"
                />
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label>Confirmer le mot de passe:</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={authData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirmez votre mot de passe"
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              {isLogin ? "Pas de compte ? " : "Déjà un compte ? "}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
            {isLogin && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  <strong>Compte de test:</strong><br />
                  Email: admin@example.com<br />
                  Mot de passe: admin123
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
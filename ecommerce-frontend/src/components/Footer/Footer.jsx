import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MaBoutique</h3>
            <p>Votre destination shopping préférée pour tous vos besoins.</p>
          </div>
          
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/products">Produits</a></li>
              <li><a href="#about">À propos</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>À propos</h4>
            <p>MaBoutique est une plateforme e-commerce offrant les meilleurs produits aux prix les plus compétitifs.</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@maboutique.com</p>
            <p>Téléphone: +33 1 23 45 67 89</p>
            <p>Adresse: 123 Rue du Commerce, Paris</p>
          </div>
          
          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 MaBoutique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
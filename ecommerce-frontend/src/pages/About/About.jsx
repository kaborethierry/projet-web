import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>À propos de MaBoutique</h1>
          <p>Découvrez notre histoire et notre engagement</p>
        </div>

        <div className="about-content">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Notre équipe" 
            />
          </div>
          
          <div className="about-text">
            <h2>Notre Histoire</h2>
            <p>
              Fondée en 2023, MaBoutique est née d'une passion pour le commerce équitable
              et la volonté de proposer des produits de qualité à des prix accessibles.
              Notre équipe de passionnés travaille quotidiennement pour vous offrir
              une expérience d'achat exceptionnelle.
            </p>
            
            <h2>Notre Mission</h2>
            <p>
              Chez MaBoutique, nous nous engageons à fournir à nos clients des produits
              de haute qualité tout en maintenant des prix compétitifs. Nous croyons en
              l'importance du service client et nous efforçons de créer une communauté
              de clients satisfaits et fidèles.
            </p>
            
            <h2>Nos Valeurs</h2>
            <ul>
              <li>✅ Qualité des produits</li>
              <li>✅ Service client exceptionnel</li>
              <li>✅ Prix équitables</li>
              <li>✅ Innovation constante</li>
              <li>✅ Respect de l'environnement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
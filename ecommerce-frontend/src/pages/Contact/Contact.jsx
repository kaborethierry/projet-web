import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Merci pour votre message! Nous vous répondrons bientôt.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>Nous sommes à votre écoute</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Informations de contact</h2>
            <div className="contact-item">
              <h3>📍 Adresse</h3>
              <p>123 Rue du Commerce, 75000 Paris, France</p>
            </div>
            <div className="contact-item">
              <h3>📞 Téléphone</h3>
              <p>+33 1 23 45 67 89</p>
            </div>
            <div className="contact-item">
              <h3>✉️ Email</h3>
              <p>contact@maboutique.com</p>
            </div>
            <div className="contact-item">
              <h3>🕒 Horaires</h3>
              <p>Lundi - Vendredi: 9h - 18h</p>
              <p>Samedi: 10h - 16h</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>

          <div className="contact-form">
            <h2>Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
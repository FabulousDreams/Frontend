// SimpleLandingPage.js

import './landingPage.css'

const SimpleLandingPage = () => {
  return (
    <div className='landing-container'>
      <header className='landing-header'>
        <h1>Welcome to The Dream Journal App</h1>
        <p>
          Log your dreams, analyze patterns, and explore your subconscious mind.
        </p>
        <button className='cta-button'>Get Started</button>
      </header>

      <section className='features'>
        <h2>Features</h2>
        <ul>
          <li>📓 Log your dreams with ease</li>
          <li>📊 Analyze patterns and emotions</li>
          <li>🌟 Connect with a community of dream enthusiasts</li>
        </ul>
      </section>

      <footer className='landing-footer'>
        <p>&copy; 2024 The Dream Journal App</p>
      </footer>
    </div>
  )
}

export default SimpleLandingPage

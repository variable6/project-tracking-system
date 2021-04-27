import Button from '../../components/Button'
import Logo from '../../components/Logo'
import './Hero.css'


const Hero = ({ openLogin }: { openLogin: () => void }) => {
  return (
    <>
      <main className="main-section">
        <section className="sec-1">
          <nav className="nav">
            <div className="logo">
              <Logo />
            </div>
          </nav>
          <div className="hero-section">
            <h5>The power of simple. A unified</h5>
            <h2>
              Digital<br />
              WorkSpace.
            </h2>
            <p>
              A simple, optimal and efficient platform to<br />
              manage and track all of your work
            </p>
            <Button.Primary label="Get started" onClick={openLogin} />
          </div>
          <div style={{ height: '17vh' }}></div>
        </section>
        <section></section>
      </main>
      <div className="span"></div>
      <div className="quote">
        <div className="quote-container">
          <div style={{ height: '50vh' }}></div>
          <p className="title">Project <span>T</span>racking <span>S</span>ystem</p>
        </div>
      </div>
      <div className="cover"></div>
    </>
  )
}

export default Hero
import { LinearProgress } from "@material-ui/core"
import Logo from "./WSLogo"


const SplashLoader = () => {
  return (
    <div className="splash-container">
      <div className="loader-container">
        <div style={{ maxWidth: 150, width: '28vw', marginBottom: '15vh' }}>
          <Logo />
        </div>
        <div style={{ width: '100%' }}>
          <LinearProgress className="loader" />
        </div>
      </div>
    </div>
  )
}

export default SplashLoader
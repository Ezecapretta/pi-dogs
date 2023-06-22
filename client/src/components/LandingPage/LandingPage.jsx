import style from './LandingPage.module.css';
import {Link} from 'react-router-dom'
import logo from '../../assets/landingGif.gif'
const LandingPage = () => {
    return(
        <div className={style.container}>
            <h1 className={style.title}>WELCOME</h1>
            <img src={logo} alt="dogs Logo" className={style.logo}/>
            <Link to={'home'}>
                <button className={style.button}>HOME</button>
            </Link>
        </div>
    )
};

export default LandingPage
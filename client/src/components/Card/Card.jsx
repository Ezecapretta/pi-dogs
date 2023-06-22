import {Link} from 'react-router-dom'
import style from './Card.module.css'
const Card = (props) => {
    const {id, name, image, temperaments} = props;

    return(
        <div className={style.container}>
            <Link to={`/detail/${id}`} className={style.link}>
            <div className={style.card}>
                <img src={image} alt="" className={style.img}/>
                <div className={style.intro}>
                    <h1 className={style.title}>{name}</h1>
                    <p className={style.text}>{temperaments}</p>
                </div>
            </div>
            </Link>
        </div>
    )
};

export default Card
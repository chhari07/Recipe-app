import './Header.css';
import { GiSpoon } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header-container border-white  ">
            <Link to={'/'}>
                <h1>
                    All Recipes
                    <GiSpoon />
                </h1>
            </Link>
            
        </div>
    )
}

export default Header;
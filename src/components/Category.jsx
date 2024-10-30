import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import './Category_.css'; // Ensure this file exists

const Category = () => {
    return (
        <div>
            {/* First Category Container */}
            <div className="category-container">
                <NavLink to={'/cuisine/Indian'} className="category-card">
                    <GiChopsticks className="category-icon" />
                    <p>Indian</p>
                </NavLink>
                <NavLink to={'/cuisine/Italian'} className="category-card">
                    <FaPizzaSlice className="category-icon" />
                    <p>Italian</p>
                </NavLink>
                <NavLink to={'/cuisine/American'} className="category-card">
                    <FaHamburger className="category-icon" />
                    <p>American</p>
                </NavLink>
                <NavLink to={'/cuisine/Thai'} className="category-card">
                    <GiNoodles className="category-icon" />
                    <p>Thai</p>
                </NavLink>
            </div>

           
        </div>
    );
};

export default Category;

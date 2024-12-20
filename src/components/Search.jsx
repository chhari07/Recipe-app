import './Search.css';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Hero } from './Hero';

const Search = () => {

    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => { setInput(e.target.value) }
    const handleSubmit = (e) => { 
        e.preventDefault();
        navigate('/searched/' + input);
    }

    return (
        <div>  
        
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <FaSearch />
                <input 
                    type="text" 
                    className='search-field'
                    value={input}
                    onChange={handleInput}
                 />
            </form>
        </div>
        </div>
    )
}

export default Search;
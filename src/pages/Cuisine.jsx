import './Cuisine.css';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { API_KEY } from '../assets/API_KEY';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';

const Cuisine = () => {
    const [cuisine, setCuisine] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    const getCuisine = async (name) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const recipe = await response.json();
            setCuisine(recipe.results);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]);

    if (loading) {
        const number = Array.from({ length: 12 }, (_, i) => i + 1);
        return (
            <div className="cuisine-skeleton">
                {number.map((data) => (
                    <Skeleton 
                        variant='rounded'
                        width={300}
                        height={200}
                        key={data}
                        animation='wave'
                        className='cuisine-skltn'
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return <div>Error fetching recipes: {error}</div>;
    }

    return (
        <div className="cuisine-container">
            {cuisine.length > 0 ? (
                cuisine.map((data) => (
                    <RecipeCard data={data} key={data.id} />
                ))
            ) : (
                <p>No recipes found for {params.type} cuisine.</p>
            )}
        </div>
    );
};

export default Cuisine;

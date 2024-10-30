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
            setLoading(true);  // Reset loading state on each fetch
            setError(null);  // Clear any previous errors
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
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
        if (params.type) {
            getCuisine(params.type);
        }
    }, [params.type]);

    if (loading) {
        return (
            <div className="cuisine-skeleton">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton 
                        variant="rounded"
                        width={300}
                        height={200}
                        key={i}
                        animation="wave"
                        className="cuisine-skltn"
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="error-message">Error fetching recipes: {error}</div>;
    }

    return (
        <div className="cuisine-container">
            {cuisine.length > 0 ? (
                cuisine.map((data) => (
                    <RecipeCard data={data} key={data.id} />
                ))
            ) : (
                <p className="no-recipes-message">No recipes found for {params.type} cuisine.</p>
            )}
        </div>
    );
};

export default Cuisine;

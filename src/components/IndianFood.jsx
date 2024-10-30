import { useState, useEffect } from "react"; 
import { Skeleton } from "@mui/material";
import './IndianFood.css';

const IndianFood = () => {
    const API_KEY = '81bdc134fb73435fbb14311ed16cb557';  // Replace with your actual API key
    const [indianFood, setIndianFood] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    const getIndianFood = async () => { 
        const check = localStorage.getItem('indianFood');
        if (check) {
            setIndianFood(JSON.parse(check));
            setLoading(false);  
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=indian`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                localStorage.setItem('indianFood', JSON.stringify(data.recipes));
                setIndianFood(data.recipes);
            } catch (error) {
                console.error("Error fetching Indian food recipes:", error);
                setError("Failed to load recipes. Please try again later."); 
            } finally {
                setLoading(false);  
            }
        }
    };

    useEffect(() => {
        getIndianFood();
    }, []);

    if (loading) {
        const skeletonArray = Array.from({ length: 10 }, (_, index) => index);
        return (
            <div className="grid-container">
                {skeletonArray.map((_, index) => (
                    <div key={index} className="recipe-card">
                        <Skeleton height={200} width={280} />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="indian-food-container">
            <h1 className="font-extrabold text-4xl mb-4">Indian Food Picks</h1>
            <div className="grid-container">
                {indianFood.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <div className="recipe-image" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                        <div className="recipe-content">
                            <h5 className="recipe-title">{recipe.title}</h5>
                            <p className="recipe-desc">A brief description of the recipe.</p>
                            <button className="recipe-button">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndianFood;

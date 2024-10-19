import { useState, useEffect } from "react"; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Skeleton } from "@mui/material";
import './Veggie.css';

const Veggie = () => {
    const API_KEY = 'YOUR_API_KEY_HERE';  // Replace with your actual API key
    const [veggie, setVeggie] = useState([]);

    const getVeggie = async () => { 
        const check = localStorage.getItem('veggie');
        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data?.recipes);
        }
    };

    useEffect(() => {
        getVeggie();
    }, []);

    if (veggie.length === 0) {
        const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <Splide options={{
                perPage: 4,
                breakpoints: {
                    1024: { perPage: 3 },
                    768: { perPage: 2 },
                    480: { perPage: 1 },
                },
                pagination: false,
                gap: '2rem',
            }}>
                {number.map((data) => (
                    <SplideSlide key={data}>
                        <Skeleton height={200} width={300} />
                    </SplideSlide>
                ))}
            </Splide>
        )
    }

    return (
        <div className="veggie-container">
            <h1 className=" font-extrabold text-4xl   mb-4  ">Veggie Picks</h1>
            <Splide options={{
                perPage: 4,
                breakpoints: {
                    1024: { perPage: 3 },
                    768: { perPage: 2 },
                    480: { perPage: 1 },
                },
                pagination: false,
                gap: '2rem',
            }}>
                {veggie.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <div className="recipe-card">
                            <div className="recipe-image" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                            <div className="recipe-content">
                                <h5 className="recipe-title">{recipe.title}</h5>
                                <p className="recipe-desc">A brief description of the recipe.</p>
                                <button className="recipe-button">Read More</button>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
      </div>
    );
};

export default Veggie;

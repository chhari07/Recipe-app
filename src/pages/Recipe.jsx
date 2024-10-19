import { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../assets/API_KEY';
import { Button, Skeleton } from '@mui/material';

const Recipe = () => {
    const [details, setDetails] = useState();
    const [active, setActive] = useState('summary');
    const params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`);
        const detailsData = await data.json();
        console.log(detailsData);
        setDetails(detailsData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    const handleClick = (status) => {
        setActive(status);
    }

    if (details === undefined) {
        return (
            <div className="recipe-shimmer-container">
                <div className="recipe-shimmer-left">
                    <Skeleton variant='text' sx={{ fontSize: '3rem' }} animation='wave' />
                    <Skeleton variant='rectangular' animation='wave' height={300} width={500} />
                </div>
                <div className="recipe-shimmer-right">
                    <div className="btn-shimmer-right">
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                    </div>
                    <div className="shimmer-content-right">
                        <Skeleton variant='text' sx={{ fontSize: '2.5rem' }} animation='wave' />
                        <div className="text-container-shimmer">
                            {[...Array(8)].map((_, index) => (
                                <Skeleton key={index} variant='text' sx={{ fontSize: '1.5rem' }} animation='wave' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="recipe-container-main">
            <h1 className='  text-2xl font-extrabold   '>{details?.title}</h1>
            <div className="recipe-container">
                <div className="recipe-container-left  mb-44   ">
                    <img src={details?.image} alt={details?.title} className='recipe-imgs' />
                </div>
                <div className="recipe-container-right">
                    <div className="btn-container">
                        <Button  className=' bg-black text-white  '
                            variant='contained' 
                            onClick={() => handleClick('summary')}
                            disabled={active === 'summary'}>
                            Summary
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => handleClick('ingredients')}
                            disabled={active === 'ingredients'}>
                            Ingredients
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => handleClick('steps')}
                            disabled={active === 'steps'}>
                            Steps
                        </Button>
                    </div>
                    <div className="recipe-right-main">
                        {active === 'summary' && 
                            <div className="summary ingredients-list"> {/* Changed className to ingredients-list */}
                                <h2 className='text-3xl font-semibold'>Summary</h2>
                                <p className=' text-justify text-xl font-semibold' dangerouslySetInnerHTML={{ __html: details?.summary }}></p>
                            </div>
                        }
                        {active === 'ingredients' && (
                            <div className="ingredients-list">
                                <h2>Ingredients</h2>
                                {details?.extendedIngredients.map((data) => (
                                    <div className="ingredient-bar" key={data?.id}>
                                        <h3 className='ingredients-h3'>
                                            <span>{data?.name}</span>
                                            <span>{data?.amount} {data?.unit}</span>
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        )}
                        {active === 'steps' && (
                            <div className="steps ingredients-list"> {/* Changed className to ingredients-list */}
                                <h1 className='text-3xl font-semibold'>Steps</h1>
                                {details?.analyzedInstructions[0]?.steps.map((data) => (
                                    <div className="step" key={data?.number}>
                                        <h2 className='text-justify'>Step - {data?.number}</h2>
                                        <p>{data?.step}</p>
                                        <h4>Ingredients - {data?.ingredients[0]?.name}</h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>     
                </div>
            </div>
        </div>
    );
}

export default Recipe;

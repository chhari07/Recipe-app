import { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../assets/API_KEY';
import { Button, Skeleton } from '@mui/material';

const Recipe = () => {
    const [details, setDetails] = useState(null);
    const [active, setActive] = useState('summary');
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const fetchDetails = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const detailsData = await response.json();
            setDetails(detailsData);
        } catch (error) {
            console.error("Failed to fetch recipe details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    const handleClick = (status) => {
        setActive(status);
    };

    const renderShimmer = () => (
        <div className="recipe-shimmer-container">
            <div className="recipe-shimmer-left">
                <Skeleton variant='text' sx={{ fontSize: '3rem' }} animation='wave' />
                <Skeleton variant='rectangular' animation='wave' height={300} width={500} />
            </div>
            <div className="recipe-shimmer-right">
                <div className="btn-shimmer-right">
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant='rounded' animation='wave' height={35} width={120} />
                    ))}
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

    const renderSummary = () => (
        <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
              <img src={details?.image} alt={details?.title} className="recipe-imgs" />
            <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          
            </div>
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg" dangerouslySetInnerHTML={{ __html: details?.summary }} />
            </div>
        </div>
    );

    const renderIngredients = () => (
        <ul className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
            <img src={details?.image} alt={details?.title} className="recipe-imgs" />
            {details?.extendedIngredients?.map((ingredient, index) => (
                
                <li key={index}>
                       
                    <article>
                        <a className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-50">
                            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                                {ingredient.name}
                            </h3>
                            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                                {ingredient.amount} {ingredient.unit}
                            </p>
                        </a>
                    </article>
                </li>
            ))}
        </ul>
    );

    const renderSteps = () => (
        <div className="px-4 py-16   mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24  text-justify">
               <img src={details?.image} alt={details?.title} className="recipe-imgs" />
            {details?.analyzedInstructions[0]?.steps.map((step, index) => (
                <div key={index} className="grid gap-6 row-gap-10 lg:grid-cols-2">
                    
                    <div className="lg:py-6 lg:pr-16">
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg className="w-4 text-gray-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <line fill="none" strokeMiterlimit="10" x1="12" y1="2" x2="12" y2="22" />
                                        <polyline fill="none" strokeMiterlimit="10" points="19,15 12,22 5,15" />
                                    </svg>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold">Step {step.number}</p>
                                <p className="text-gray-700">{step.step}</p>
                            </div>
                        </div>
                    </div>
                    {step.image && (
                        <div className="relative">
                            <img
                                className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                                src={step.image}
                                alt={`Step ${step.number}`}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    if (loading) return renderShimmer();

    return (
        <div className="recipe-container-main">
            <h1 className="text-2xl font-extrabold mt-10 ml-14">{details?.title}</h1>
            <div className="recipe-container">
                <div className="recipe-container-right">
                    <div className="btn-container">
                        <Button variant="contained" onClick={() => handleClick('summary')} disabled={active === 'summary'}>
                            Summary
                        </Button>
                        <Button variant="contained" onClick={() => handleClick('ingredients')} disabled={active === 'ingredients'}>
                            Ingredients
                        </Button>
                        <Button variant="contained" onClick={() => handleClick('steps')} disabled={active === 'steps'}>
                            Steps
                        </Button>
                    </div>
                    <div className="recipe-right-main">
                        {active === 'summary' && renderSummary()}
                        {active === 'ingredients' && renderIngredients()}
                        {active === 'steps' && renderSteps()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;

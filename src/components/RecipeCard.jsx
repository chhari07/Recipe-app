// RecipeCard.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RecipeCard = ({ data }) => {
    // Safety check to handle cases where data might be undefined
    if (!data) {
        return <StyledCard>Loading...</StyledCard>; // or return null if you prefer not to show anything
    }

    return (
        <Link to={'/recipe/' + data.id}>
            <StyledCard>
                <div className="image" style={{ backgroundImage: `url(${data.image})` }} />
                <div className="content">
                    <span className="title">{data.title}</span>
                    {/* Check if summary exists before trying to access its length */}
                    <p className="desc">
                        {data.summary ? data.summary.length : 'No summary available'}
                    </p>
                    <a className="action" href="#">
                        Find out more
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </StyledCard>
        </Link>
    );
};

const StyledCard = styled.div`
  max-width: 300px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  text-decoration: none;

  .image {
    object-fit: cover;
    width: 100%;
    height: 150px;
    background-color: rgb(239, 205, 255);
    background-size: cover;
    background-position: center;
    border-radius: 0.5rem 0.5rem 0 0; /* Rounded top corners */
  }

  .content {
    padding: 1.1rem;
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  .desc {
    margin-top: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .action {
    display: inline-flex;
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    align-items: center;
    gap: 0.25rem;
    background-color: black;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .action:hover {
    background-color: #1d4ed8; /* Darken the button on hover */
  }

  .action span {
    transition: .3s ease;
  }

  .action:hover span {
    transform: translateX(4px);
  }
`;

export default RecipeCard;

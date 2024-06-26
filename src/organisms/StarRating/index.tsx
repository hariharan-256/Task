import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarRatingProps {
    rating: number; // Current rating
    maxRating?: number; // Maximum possible rating
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    return (
        <div className="flex items-center mt-2">
            {[...Array(maxRating)].map((_, index) => {
                const starNumber = index + 1;
                return (
                    <div key={index} className="focus:outline-none">
                        {starNumber <= rating ? (
                            <AiFillStar className="text-yellow-500 w-6 h-6" />
                        ) : (
                            <AiOutlineStar className="text-yellow-500 w-6 h-6" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;

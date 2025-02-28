import React, {useState} from "react";
import { addToWishlist, removeFromWishlist } from "../services/wishlistService";

const PropertyCard = ({ property }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    const handleFavoriteClick = async () => {
        if (isFavorite) {
            await removeFromWishlist(property.id);
        } else {
            await addToWishlist(property.id);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="property-card">
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <p>gia {property.price}vnd</p>
            <button onClick={handleFavoriteClick}>
                {isFavorite ? "bo yeu thich" : "them vao yeu thich"}
            </button>
        </div>
    );
};
export default PropertyCard;  



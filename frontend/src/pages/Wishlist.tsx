import React, { useState, useEffect } from "react";
import { getWishlist } from "../services/wishlistService";
import { Wishlist } from "../types/Wishlist";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState<Wishlist[]>([]);

    useEffect(() => {
        getWishlist("1").then(setWishlist);
    },[]);

    return (
        <div>
            <h1>DS yeu thich</h1>
            {wishlist.length === 0 ? <p>Khong co nha nao trong danh sacch yeu thich </p> : (
                <ul>
                    {wishlist.map((item) => (
                        <li key={item.id}> bds id : {item.property_id} </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishlistPage;


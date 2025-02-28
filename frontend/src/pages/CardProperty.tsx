import React from "react";
import { Property } from "../types/Property";

interface Props {
    property: Property;
}

const CardProperty = ({ property }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p>{property.location}</p>
            <p className="text-red-500">{property.priec.toLocaleString()} VND</p>
        </div>
    );
};  

export default CardProperty;

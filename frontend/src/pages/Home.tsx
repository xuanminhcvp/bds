import React, { useEffect, useState } from "react";
import { fetchProperties } from "../services/propertyService";
import { Property } from "../types/Property";
import { CardProperty } from "../components/CardProperty";

const Home = () => {
    const [ properties, setProperties ] = useState<Property[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

useEffect(() => {
    fetchProperties()
        .then((data) => {
            setProperties(data);
            setLoading(false);            
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
},[]);

if (loading) return <p>Loading properties</p>;
if (error) return <p>Error: {error}</p>;

return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Danh sach bds</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
                <CardProperty key={property.id} property={property} />
            ))}
        </div>
    </div>
    );
};
export default Home;
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../types/Property";
import { getPropertyById } from "../services/propertyService";

const PropertyDetail = () => {
    const {id} = useParams< id: string >(); 
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            getPropertyById(id)
                .then((data) => {
                    setProperty(data);
                    setLoading(false);
                });
                .catch((error) => {
                    console.error("Error fetching property:", error);
                    setLoading(false);
                });

        }
    }, [id]);

    if (loading) return <p>Dang tai</p>;
    if (!property) return <p>Khong tim thay bds</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-xl font-semibold text-green-600">{property.price}</p>

            {/* Hien thi hinh anh */}
            {property.images.length > 0 && (
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 object-cover my-4 rounded-lg shadow-md"
                />
            )}

            {/* Thong tin chi tiet */}
            <div className="grid grid-cols-2 gap-4">
                <p>{property.bedrooms} phong ngu</p>
                <p>{property.bathrooms} phong tam</p>
                <p>{property.area} m2</p>
            </div>

            {/* Mo ta */}
            <p className="mt-4 text-gray-700">{property.description}</p>
        </div>
    );
};

export default PropertyDetail;


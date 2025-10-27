import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function DetallePropiedad() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    API.get(`/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(console.error);
  }, [id]);

  if (!property) return <div className="container">Cargando...</div>;

  return (
    <div className="container property-detail">
      <img src={property.photos?.[0]?.path || "/placeholder.jpg"} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p><strong>Precio:</strong> ${property.price}</p>
      <p><strong>Ubicación:</strong> {property.address}, {property.city}, {property.country}</p>
      <p><strong>Superficie:</strong> {property.m2_total} m² (cubiertos: {property.m2_covered} m²)</p>
      <p><strong>Habitaciones:</strong> {property.bedrooms}</p>
      <p><strong>Baños:</strong> {property.bathrooms}</p>
      <p><strong>Amenities:</strong> {property.amenities}</p>
    </div>
  );
}

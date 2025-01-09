import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sliders, MapPin, Bed, Bath, Home } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [priceRange, setPriceRange] = React.useState([0, 10000000]);
  const [propertyType, setPropertyType] = React.useState('all');

  // Mock data - will be replaced with Supabase data
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment in South Mumbai",
      price: 15000000,
      location: "Worli, Mumbai",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      type: "Apartment",
      beds: 3,
      baths: 2,
      area: 1500,
    },
    // Add more mock properties...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="font-medium mb-2">Property Type</h3>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:w-3/4">
          <h1 className="text-2xl font-bold mb-6">
            {query ? `Search results for "${query}"` : 'All Properties'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{property.area} sq.ft</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{(property.price / 100000).toFixed(1)} Lac
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
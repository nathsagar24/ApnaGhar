import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Home, Calendar, Phone, Mail } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();

  // Mock data - will be replaced with Supabase data
  const property = {
    id: 1,
    title: "Luxury Apartment in South Mumbai",
    price: 15000000,
    location: "Worli, Mumbai",
    description: "This luxurious apartment offers stunning sea views and world-class amenities. Features include modern kitchen, spacious bedrooms, and premium finishes throughout.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    ],
    type: "Apartment",
    beds: 3,
    baths: 2,
    area: 1500,
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Garden"],
    agent: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya@apnaghar.com"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Property Images */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        <img
          src={property.images[1]}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <img
          src={property.images[2]}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Bed className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Bath className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Home className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{property.area} sq.ft</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-indigo-600 mb-6">
              ₹{(property.price / 100000).toFixed(1)} Lac
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Contact Agent</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Available for viewing</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
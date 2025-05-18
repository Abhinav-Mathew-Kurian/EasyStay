import React from 'react';
import service1 from "../../assets/service1.jpeg";
import service2 from "../../assets/service2.jpeg";
import service3 from "../../assets/service3.jpeg";

const Services = () => {
  const services = [
    {
      'name': "Rooms Crafted for You",
      'slogan': "Find Your Perfect Space",
      'description': "Search for rooms with advanced filtering techniques like price range, distance from offices and schools, city location, and amenities that match your lifestyle.",
      'image': service1
    },
    {
      'name': "Co-Living Space",
      'slogan': "Connect with Like-minded Roommates",
      'description': "Tight on budget? Live with other homies for a lifetime full of memories. Our co-living options offer affordability without compromising on comfort.",
      'image': service2
    },
    {
      'name': "Rent Rooms",
      'slogan': "List Your Property Effortlessly",
      'description': "No more hassle advertising. Just post your room, PG, or hostel availability with a click and connect with verified tenants looking for a place like yours.",
      'image': service3
    }
  ];

  return (
    <div id='services' className="bg-gradient-to-b from-[#00C49A] to-[#1E1E2F]  py-16 min-h-screen relative overflow-hidden"> {/* Added relative and overflow-hidden */}
      <div className='absolute inset-0 grid grid-cols-12 z-0'>
        {[...Array(12)].map((_,i)=>{
          return <div key={`col=${i}`} className='h-full w-px bg-[#fafafa] opacity-5'></div>
        })}
      </div>
      <div className='absolute inset-0 grid grid-rows-12 z-0'>
        {[...Array(12)].map((_,i)=>{
          return <div key={`row=${i}`} className='h-px w-full bg-[#fafafa] opacity-5'></div>
        })}
      </div>
      <div className="container mx-auto px-4 relative z-10"> {/* Added relative z-10 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E2F] mb-4">Our Services</h2>
          <p className="text-[#fafafa] text-lg max-w-2xl mx-auto">EasyStay connects students, professionals, and travelers with their ideal accommodation options all in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mx-10 shadow-amber-50">
          {services.map((service, index) => (
            <div key={index} className="rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden group bg-white"> {/* Added bg-white here if you want the cards to be opaque */}
              {/* Card Header with primary color and image */}
              <div className="relative h-48 overflow-hidden bg-[#00C49A]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00C49A] to-transparent opacity-70"></div>

                {/* Service name on the image */}
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-white p-6 group-hover:bg-[#FAFAFA] transition-colors duration-300">
                <p className="text-[#B388EB] font-medium mb-3">{service.slogan}</p>
                <p className="text-[#6B7280]">{service.description}</p>

                <div className="mt-6">
                  <button className="inline-flex items-center text-[#00C49A] font-medium hover:text-[#1E1E2F] transition-colors">
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
import React, { useState } from 'react';
import ContactImg from "../../assets/contact.png";
import { Mail, MapPin, Phone, Clock, CheckCircle, Hotel, CreditCard, Users } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div id='contactus' className=' min-h-screen relative w-full bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] overflow-hidden'>
      {/* Grid overlay for visual effect */}
      <div className="absolute inset-0 grid grid-cols-12 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={`col-${i}`} className="h-full w-px bg-white opacity-5"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={`row-${i}`} className="w-full h-px bg-white opacity-5"></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00C49A] mb-4">Contact Us</h2>
          <p className="text-[#FAFAFA] text-lg max-w-2xl mx-auto">
            We value your feedback, inquiries, and concerns. Feel free to reach out to us anytime.
          </p>
        </div>

        {/* Contact Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mx-10 mx-3 mb-10'>
          {/* Left Side - Interactive Image Section */}
          <div className='rounded-2xl border border-[#B388EB] border-opacity-50 overflow-hidden shadow-lg bg-gradient-to-br from-[#1E1E2F]/90 to-[#1E1E2F]/70 backdrop-blur-sm'>
            <div className="p-6 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#B388EB] mb-2">Why Choose EasyStay?</h3>
                <div className="w-16 h-1 bg-[#B388EB] mx-auto mb-4"></div>
              </div>
              
              <div className="relative mb-6 overflow-hidden rounded-xl h-94 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2F]/80 via-transparent to-[#1E1E2F]/40 z-10"></div>
                <img 
                  src={ContactImg} 
                  alt="EasyStay Accommodations" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <p className="text-[#FAFAFA] text-base font-semibold">Experience Home all over India</p>
                  <p className="text-[#00C49A] text-sm">Premium accommodations at affordable prices</p>
                </div>
              </div>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-l-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <Hotel className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">Best Rooms</span>
                </div>
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-l-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <CreditCard className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">Easy Booking</span>
                </div>
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-l-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <Users className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">24/7 Support</span>
                </div>
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-l-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <CheckCircle className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">Best Prices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className='rounded-2xl border border-[#00C49A] border-opacity-50 overflow-hidden backdrop-blur-sm p-6 bg-gradient-to-tr from-[#1E1E2F]/80 via-[#1E1E2F]/40 to-transparent'>
            <div className="mb-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00C49A] mb-3">
                We're Closer Than You Think
              </h2>
              <div className="w-24 h-1 bg-[#00C49A] mx-auto"></div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div className="bg-gradient-to-r from-[#1E1E2F]/60 to-[#1E1E2F]/40 backdrop-blur-sm p-4 rounded-lg flex items-center border-l-4 border-[#B388EB]">
                <MapPin className="text-[#B388EB] mr-3" size={22} />
                <div>
                  <h3 className="font-semibold text-[#B388EB] mb-1">Our Location</h3>
                  <p className="text-[#FAFAFA] text-sm">Trivandrum, Kerala, India</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-r from-[#1E1E2F]/60 to-[#1E1E2F]/40 backdrop-blur-sm p-4 rounded-lg flex items-center border-l-4 border-[#B388EB]">
                <Mail className="text-[#B388EB] mr-3" size={22} />
                <div>
                  <h3 className="font-semibold text-[#B388EB] mb-1">Email Us</h3>
                  <p className="text-[#FAFAFA] text-sm">easy@stay.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-r from-[#1E1E2F]/60 to-[#1E1E2F]/40 backdrop-blur-sm p-4 rounded-lg flex items-center border-l-4 border-[#B388EB]">
                <Phone className="text-[#B388EB] mr-3" size={22} />
                <div>
                  <h3 className="font-semibold text-[#B388EB] mb-1">Call Us</h3>
                  <p className="text-[#FAFAFA] text-sm">+91 98765 43210</p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-r from-[#1E1E2F]/60 to-[#1E1E2F]/40 backdrop-blur-sm p-4 rounded-lg flex items-center border-l-4 border-[#B388EB]">
                <Clock className="text-[#B388EB] mr-3" size={22} />
                <div>
                  <h3 className="font-semibold text-[#B388EB] mb-1">Open Hours</h3>
                  <p className="text-[#FAFAFA] text-sm">24/7 Customer Support</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              {formSubmitted ? (
                <div className="bg-[#00C49A]/20 border border-[#00C49A] p-4 rounded-lg text-center">
                  <CheckCircle className="text-[#00C49A] mx-auto mb-2" size={32} />
                  <p className="text-[#FAFAFA] font-medium">Message sent successfully!</p>
                  <p className="text-[#FAFAFA]/80 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      className="bg-[#1E1E2F]/30 backdrop-blur-sm p-3 rounded-lg text-[#FAFAFA] border border-[#00C49A]/40 focus:border-[#00C49A] focus:outline-none"
                    />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email" 
                      className="bg-[#1E1E2F]/30 backdrop-blur-sm p-3 rounded-lg text-[#FAFAFA] border border-[#00C49A]/40 focus:border-[#00C49A] focus:outline-none"
                    />
                  </div>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject" 
                    className="bg-[#1E1E2F]/30 backdrop-blur-sm p-3 rounded-lg text-[#FAFAFA] border border-[#00C49A]/40 focus:border-[#00C49A] focus:outline-none w-full mb-4"
                  />
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message" 
                    rows="4" 
                    className="bg-[#1E1E2F]/30 backdrop-blur-sm p-3 rounded-lg text-[#FAFAFA] border border-[#00C49A]/40 focus:border-[#00C49A] focus:outline-none w-full mb-4"
                  ></textarea>
                  <button 
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#00C49A] to-[#B388EB] text-[#FAFAFA] py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-300 w-full"
                  >
                    Send Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
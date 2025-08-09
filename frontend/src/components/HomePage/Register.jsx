import React, { useState } from 'react';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, 
  Shield, CheckCircle, AlertCircle, Home, Building,
  Facebook, Chrome, Github, Calendar, MapPin
} from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const Register = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    userType: 'tenant',
    agreeToTerms: false,
    subscribeNewsletter: false
  });


  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91-\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (+91-XXXXXXXXXX)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
  if (!validateStep2()) return;

  setIsLoading(true);

  try {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      password: formData.password,
      gender: formData.gender
    };
    console.log(payload)
    const res = await axios.post("http://localhost:5001/api/auth/register", payload);

    // Save JWT token
    localStorage.setItem("token", res.data.token);

    await Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'Your account was created successfully.',
        confirmButtonText: 'Go to dashboard'
      });

      navigate(`/${res.data.userId}/dashboard`);
    console.log("JWT Token:", res.data.token);
 

  } catch (err) {
    if (err.response && err.response.data) {
      setErrors({ apiError: err.response.data.message || "Registration failed" });
    } else {
      setErrors({ apiError: "Something went wrong. Please try again." });
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    Swal.fire('Not implemented', `${provider} signup is not implemented yet.`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00C49A] rounded-full mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/80">Join us to find your perfect accommodation</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= 1 ? 'bg-[#00C49A] border-[#00C49A] text-white' : 'border-gray-600 text-gray-400'
            }`}>
              {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-[#00C49A]' : 'bg-gray-600'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= 2 ? 'bg-[#00C49A] border-[#00C49A] text-white' : 'border-gray-600 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-[#2B2B40] rounded-lg p-8 shadow-xl">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Personal Information</h2>
                <p className="text-white/60 text-sm">Tell us about yourself</p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                        errors.firstName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-600 focus:border-[#00C49A]'
                      }`}
                      placeholder="First name"
                    />
                  </div>
                  {errors.firstName && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.lastName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                    placeholder="+91-9876543210"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  I am looking to:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'tenant')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.userType === 'tenant'
                        ? 'border-[#00C49A] bg-[#00C49A]/20 text-[#00C49A]'
                        : 'border-gray-600 bg-[#1E1E2F] text-white/80 hover:border-[#00C49A]/50'
                    }`}
                  >
                    <Home className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Find a Place</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'owner')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.userType === 'owner'
                        ? 'border-[#00C49A] bg-[#00C49A]/20 text-[#00C49A]'
                        : 'border-gray-600 bg-[#1E1E2F] text-white/80 hover:border-[#00C49A]/50'
                    }`}
                  >
                    <Building className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">List Property</p>
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-3 px-4 bg-[#00C49A] hover:bg-[#00b388] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Account Security</h2>
                <p className="text-white/60 text-sm">Set up your password and preferences</p>
              </div>

              {/* Password Fields */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                        errors.dateOfBirth 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-600 focus:border-[#00C49A]'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${
                      errors.gender 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-600 focus:border-[#00C49A]'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                                        
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-white/80 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="accent-[#00C49A] w-5 h-5"
                  />
                  I agree to the <span className="text-[#00C49A] underline cursor-pointer">terms and conditions</span>
                </label>
                {errors.agreeToTerms && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agreeToTerms}
                  </div>
                )}

                <label className="flex items-center gap-3 text-white/80 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.subscribeNewsletter}
                    onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                    className="accent-[#00C49A] w-5 h-5"
                  />
                  Subscribe to our newsletter
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/2 py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-1/2 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#00C49A] hover:bg-[#00b388] text-white'
                  }`}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Social Register */}
        <div className="mt-8 text-center">
          <p className="text-white/80 mb-4">Or sign up with</p>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => handleSocialRegister('Facebook')}
              className="bg-[#4267B2] hover:bg-[#365899] p-3 rounded-full text-white"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialRegister('Google')}
              className="bg-[#DB4437] hover:bg-[#c1351d] p-3 rounded-full text-white"
            >
              <Chrome className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialRegister('GitHub')}
              className="bg-[#333] hover:bg-[#24292e] p-3 rounded-full text-white"
            >
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

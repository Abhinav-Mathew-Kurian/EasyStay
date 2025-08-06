import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight,
    Shield, CheckCircle, AlertCircle, Home, Building,
    Facebook, Chrome, Github
} from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert('Login successful!');
            console.log('Login data:', formData);
        }, 2000);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        alert(`${provider} login clicked`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00C49A] rounded-full mb-4">
                        <Home className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/80">Sign in to your account to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-[#2B2B40] rounded-lg p-8 shadow-xl">
                    <div className="space-y-6">
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
                                    className={`w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${errors.email
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

                        {/* Password Field */}
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
                                    className={`w-full pl-10 pr-12 py-3 bg-[#1E1E2F] border rounded-lg focus:outline-none transition-colors ${errors.password
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-600 focus:border-[#00C49A]'
                                        }`}
                                    placeholder="Enter your password"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                    className="w-4 h-4 text-[#00C49A] bg-[#1E1E2F] border-gray-600 rounded focus:ring-[#00C49A] focus:ring-2"
                                />
                                <span className="text-sm text-white/80">Remember me</span>
                            </label>
                            <button className="text-sm text-[#00C49A] hover:text-[#00b388] font-medium">
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${isLoading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-[#00C49A] hover:bg-[#00b388] text-white'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#2B2B40] text-white/60">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                className="flex items-center justify-center p-3 bg-[#1E1E2F] hover:bg-[#00C49A]/20 border border-gray-600 rounded-lg transition-colors"
                            >
                                <Chrome className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => handleSocialLogin('Facebook')}
                                className="flex items-center justify-center p-3 bg-[#1E1E2F] hover:bg-[#00C49A]/20 border border-gray-600 rounded-lg transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => handleSocialLogin('GitHub')}
                                className="flex items-center justify-center p-3 bg-[#1E1E2F] hover:bg-[#00C49A]/20 border border-gray-600 rounded-lg transition-colors"
                            >
                                <Github className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                    <p className="text-white/80">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-[#dc6bff] hover:text-[#b95ab5] font-semibold"
                        >
                            Sign up here
                        </button>

                    </p>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-[#2B2B40]/50 rounded-lg p-4 text-center">
                        <Shield className="w-6 h-6 text-[#00C49A] mx-auto mb-2" />
                        <p className="text-sm text-white/80">Secure Login</p>
                    </div>
                    <div className="bg-[#2B2B40]/50 rounded-lg p-4 text-center">
                        <Building className="w-6 h-6 text-[#00C49A] mx-auto mb-2" />
                        <p className="text-sm text-white/80">Verified Properties</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
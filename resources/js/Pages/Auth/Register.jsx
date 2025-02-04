import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', password: '', password_confirmation: '',
        dateOfBirth: '', nationality: '', current_location: '', preferred_countries: '',
        position: '', education: '', languages: '', passport_number: '',
        cv: null, cover_letter: null, references: '', role_id: 3
    });

    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Guest>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-yellow-400 text-xl">
                <Head title="Register" />
                
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                    <img 
                        src="/image/logo/logo.png" 
                        alt="hyper" 
                        className="h-16 mb-3 mx-auto"
                    />

                    <div className="flex justify-end mb-4">
                        <Link 
                            href={route('home')}
                            as="button" 
                            className="text-sm bg-black text-white rounded-md hover:text-red-500 transition-colors px-4 py-2"
                        >
                            Go back
                        </Link>
                    </div>
                    
                    <h2 className="text-center text-3xl font-bold mb-6">Registration Form</h2>

                    {/* Progress Bar */}
                    <div className="relative w-full bg-gray-200 rounded-full h-2 mb-6">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                    </div>


                    <form onSubmit={submit} className="space-y-6">
                        {step === 1 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                                
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">Full Name</label>
                                    <input 
                                        type="text" name="name" id="name" value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)} 
                                        placeholder="Full Name" className="w-full p-2 border rounded" 
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="block mb-1">Email</label>
                                    <input 
                                        type="email" name="email" id="email" value={data.email} 
                                        onChange={(e) => setData('email', e.target.value)} 
                                        placeholder="Email" className="w-full p-2 border rounded" 
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="phone" className="block mb-1">Phone</label>
                                    <input 
                                        type="tel" name="phone" id="phone" value={data.phone} 
                                        onChange={(e) => setData('phone', e.target.value)} 
                                        placeholder="Phone" className="w-full p-2 border rounded" 
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="block mb-1">Password</label>
                                    <input 
                                        type="password" name="password" id="password" value={data.password} 
                                        onChange={(e) => setData('password', e.target.value)} 
                                        placeholder="Password" className="w-full p-2 border rounded" 
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Work & Education</h3>
                                <div className="mb-3">
                                    <label htmlFor="position" className="block mb-1">Work position</label>
                                    <input 
                                        type="text" name="position" id="position" value={data.position} 
                                        onChange={(e) => setData('position', e.target.value)} 
                                        placeholder="Position" className="w-full p-2 border rounded" 
                                    />
                                    {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                                <div className="mb-3">
                                    <label htmlFor="passport_number" className="block mb-1">Passport/ID number</label>
                                    <input 
                                        type="text" name="passport_number" id="passport_number" value={data.passport_number} 
                                        onChange={(e) => setData('passport_number', e.target.value)} 
                                        placeholder="Passport/ID Number" className="w-full p-2 border rounded" 
                                    />
                                    {errors.passport_number && <p className="text-red-500 text-sm">{errors.passport_number}</p>}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
                                <div className="mb-3">
                                    <label htmlFor="cv" className="block mb-1">Upload CV</label>
                                    <input type="file" id="cv" onChange={(e) => setData('cv', e.target.files[0])} className="w-full p-2 border rounded" />
                                    {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cover_letter" className="block mb-1">Certificate of good conduct</label>
                                    <input type="file" id="cover_letter" onChange={(e) => setData('cover_letter', e.target.files[0])} className="w-full p-2 border rounded" />
                                    {errors.cover_letter && <p className="text-red-500 text-sm">{errors.cover_letter}</p>}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Back</button>}
                            {step < totalSteps && (
                                <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
                            )}

                            {step == 4 && (
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">
                                    {processing ? 'Submitting...' : 'Submit'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Guest>
    );
}

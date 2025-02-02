import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', password: '', password_confirmation: '',
        dateOfBirth: '', nationality: '', currentLocation: '', preferredCountries: '',
        workExperience: '', education: '', languages: '', passportNumber: '',
        cv: null, coverLetter: null, references: '', role_id: 3
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
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
                <Head title="Register" />
                
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                    <img 
                        src="/image/logo/logo.png" 
                        alt="hyper" 
                        className="h-14 mb-3 mx-auto"
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
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Work & Education</h3>
                                <div className="mb-3">
                                    <label htmlFor="workExperience" className="block mb-1">Work Experience (years)</label>
                                    <input 
                                        type="number" name="workExperience" id="workExperience" value={data.workExperience} 
                                        onChange={(e) => setData('workExperience', e.target.value)} 
                                        placeholder="Work Experience (years)" className="w-full p-2 border rounded" 
                                    />
                                    {errors.workExperience && <p className="text-red-500 text-sm">{errors.workExperience}</p>}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                                <div className="mb-3">
                                    <label htmlFor="passportNumber" className="block mb-1">Passport Number</label>
                                    <input 
                                        type="text" name="passportNumber" id="passportNumber" value={data.passportNumber} 
                                        onChange={(e) => setData('passportNumber', e.target.value)} 
                                        placeholder="Passport Number" className="w-full p-2 border rounded" 
                                    />
                                    {errors.passportNumber && <p className="text-red-500 text-sm">{errors.passportNumber}</p>}
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

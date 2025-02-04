import React from 'react';
import { usePage, Head, Link } from '@inertiajs/react';

const ProcessedRequest = () => {
    const { user } = usePage().props; 


    return (
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <Head title="KYC submission" />
            
            <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                
                <div className="relative bg-white shadow-lg sm:rounded-3xl p-6">
                    <div className="flex justify-end mb-4">
                        <Link 
                            href={route('home')}
                            as="button" 
                            className="text-sm bg-black text-white rounded-md hover:text-red-500 transition-colors px-4 py-2"
                        >
                            Go back
                        </Link>
                    </div>

                    <div>
                        <p>Hi, {user.name}</p>
                        <p>Your submission is being processed!</p>
                        <p>{user?.latest_notification?.message}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProcessedRequest;
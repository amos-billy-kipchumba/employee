<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Notification;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;

use App\Mail\AdminUserRegistrationMail;
use Illuminate\Support\Facades\Storage;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $notification = Notification::orderBy('created_at', 'desc')->first();
        
        return Inertia::render('Auth/Register', [
            'notification'=> $notification
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

     public function store(Request $request)
     {
         $request->validate([
             'name' => 'required|string|max:255',
             'role_id' => 'nullable',
             'phone' => 'required',
             'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
             'password' => ['nullable'],
             'date_of_birth' => 'nullable|date',
             'nationality' => 'nullable|string',
             'current_location' => 'nullable|string',
             'preferred_countries' => 'nullable|array',
             'position' => 'nullable',
             'education' => 'nullable|string',
             'languages' => 'nullable|string',
             'passport_number' => 'nullable|string',
             'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
             'cover_letter' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
             'references' => 'nullable|string',
         ]);
     
         // Store the uploaded files
         $cvPath = $request->file('cv') ? $request->file('cv')->store('cvs', 'public') : null;
         $coverLetterPath = $request->file('cover_letter') ? $request->file('cover_letter')->store('cover_letters', 'public') : null;
     
         $user = User::create([
             'name' => $request->name,
             'email' => $request->email,
             'phone' => $request->phone,
             'role_id' => 3,
             'password' => Hash::make($request->password),
             'date_of_birth' => $request->date_of_birth,
             'nationality' => $request->nationality,
             'current_location' => $request->current_location,
             'preferred_countries' => $request->preferred_countries,
             'position' => $request->position,
             'education' => $request->education,
             'languages' => $request->languages,
             'passport_number' => $request->passport_number,
             'cv' => $cvPath,
             'cover_letter' => $coverLetterPath,
             'references' => $request->references,
         ]);
     
         // Send confirmation email to user
         event(new Registered($user));
         Auth::login($user);
     
         // Convert the stored file paths to their full absolute paths
         $cvFullPath = $cvPath ? storage_path('app/public/' . $cvPath) : null;
         $coverLetterFullPath = $coverLetterPath ? storage_path('app/public/' . $coverLetterPath) : null;
     
         // Send email to admin with file attachments
         $virtualUser = new User;
         $virtualUser->email = 'info@linkpathtravel.agency';
     
         Mail::to($virtualUser)->send(new AdminUserRegistrationMail($user, $cvFullPath, $coverLetterFullPath));

         $notification = Notification::orderBy('created_at', 'desc')->first();
     
         return Inertia::render('Employees/ProcessedRequest', [
             'user' => $user,
             'notification'=> $notification
         ]);
     }
     
    
}

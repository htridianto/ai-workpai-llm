'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const getErrorMessage = (code: string | null) => {
  switch (code) {
    case "user_not_found":
    case "UserNotFound":
      return "User tidak ditemukan atau silakan login via Google.";
    case "invalid_password":
    case "InvalidPassword":
      return "Password yang Anda masukkan salah.";
    default:
      return "Gagal masuk. Periksa kembali akun Anda.";
  }
};     

function ShowErrorMessage() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error");
  const codeParam = searchParams.get("code");
  
  let error = '';
  if(errorParam === "CredentialsSignin"){
    error = getErrorMessage(codeParam || null);   
  }else if(errorParam === "AccessDenied"){
    error = "Access Denied. Please try again later.";   
  }
  
  return (
    <>
    {error && (
      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200 dark:border-red-900/30">
        <AlertCircle size={16} />
        {error}
      </div>    
    )}
    </>
  )      
}

export default function AuthPage() {  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  // const [error, setError] = useState('');
  // const searchParams = useSearchParams();
  // const errorParam = searchParams.get("error");
  // const codeParam = searchParams.get("code");
  
  // useEffect(() => {
  //   if(errorParam === "CredentialsSignin"){
  //     setError( getErrorMessage(codeParam || null) );   
  //   }else if(errorParam === "AccessDenied"){
  //     setError( "Access Denied. Please try again later." );   
  //   }
  // }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError('');
    setIsLoading(true);
    setLoadingText('Authenticating...');

    await signIn("credentials", {
      identifier: email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    });

    // const result = await signIn("credentials", {
    //   identifier: email,
    //   password,
    //   redirect: false
    // });
    // setIsLoading(false);
    // if(result.error || result.code){   
    //   setError( getErrorMessage(result.code || null) );    
    //   return;
    // }    
    // setTimeout(() => {
    //     router.push('/');
    //   }, 500);

    // try {
    //   // 1. API Call
    //   await AuthService.login(email, password);
      
    //   // 2. Setup Data Environment (Default: Populated for standard login)
    //   localStorage.removeItem('anything_llm_mock_workspaces');
    //   localStorage.removeItem('anything_llm_mock_sessions');
    //   localStorage.removeItem('anything_llm_mock_generated_files');
    //   localStorage.removeItem('anything_llm_mock_generated_folders');

    //   setLoadingText('Redirecting to dashboard...');
    //   setTimeout(() => {
    //     router.push('/');
    //   }, 500);
      
    // } catch (err: any) {
    //   setError(err.message || 'Authentication failed');
    //   setIsLoading(false);
    // }
  };

  const handleGoogleLogin = async () => {
    // setError('');
    setIsLoading(true);
    setLoadingText('Connecting to Google...');
    
    await signIn('google', { callbackUrl: "/dashboard" });

    /*
    setError('');
    setIsLoading(true);
    setLoadingText('Connecting to Google...');
    
    try {
      // 1. Setup Data Environment (Populated for Demo)
      localStorage.removeItem('anything_llm_mock_workspaces');
      localStorage.removeItem('anything_llm_mock_sessions');
      localStorage.removeItem('anything_llm_mock_generated_files');
      localStorage.removeItem('anything_llm_mock_generated_folders');

      // 2. Simulate OAuth
      await AuthService.loginWithGoogle();
      
      setLoadingText('Verifying token...');
      setTimeout(() => {
         onLogin();
      }, 500);

    } catch (err: any) {
      setError('Google sign-in failed. Please try again.');
      setIsLoading(false);
    }
    */
  };

  const handleDemoLogin = async () => {
    // setError('');
    setIsLoading(true);
    setLoadingText('Provisioning demo instance...');
    
    await signIn("credentials", {
      identifier: 'demo',
      password: 'password123',
      redirect: true,
      callbackUrl: "/dashboard"
    });    
    // try {
    //   // 1. Setup Data Environment (Populated for Demo)
    //   localStorage.removeItem('anything_llm_mock_workspaces');
    //   localStorage.removeItem('anything_llm_mock_sessions');
    //   localStorage.removeItem('anything_llm_mock_generated_files');
    //   localStorage.removeItem('anything_llm_mock_generated_folders');

    //   // 2. Simulate Demo Setup
    //   await AuthService.loginDemo();
      
    //   setLoadingText('Finalizing workspace...');
    //   setTimeout(() => {
    //     router.push('/');
    //   }, 500);

    // } catch (err: any) {
    //    setError('Failed to launch demo instance.');
    //    setIsLoading(false);
    // }
  };
  
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sign In</h2>
        <p className="text-slate-500 dark:text-charcoal-400">Access your WorkPai workspace.</p>
      </div>

      <div className="space-y-4 mb-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
        >
           {isLoading && loadingText.includes('Google') ? (
             <div className="flex items-center gap-2">
               <Loader2 size={18} className="animate-spin text-charcoal-500" />
               <span className="text-sm text-charcoal-500">{loadingText}</span>
             </div>
           ) : (
             <>
               <GoogleIcon />
               <span>Sign in with Google</span>
             </>
           )}
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-charcoal-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-charcoal-900 text-slate-500 dark:text-charcoal-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-charcoal-300 mb-1.5 ml-1">Username</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-charcoal-500 group-focus-within:text-accent-500 dark:group-focus-within:text-accent-400 transition-colors">
              <User size={20} />
            </div>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-charcoal-700 rounded-xl bg-gray-50 dark:bg-charcoal-950 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-charcoal-600 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all"
              placeholder="admin@local.host"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-charcoal-300 mb-1.5 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-charcoal-500 group-focus-within:text-accent-500 dark:group-focus-within:text-accent-400 transition-colors">
              <Lock size={20} />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-charcoal-700 rounded-xl bg-gray-50 dark:bg-charcoal-950 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-charcoal-600 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
        
      <Suspense fallback={<div>Loading error message...</div>}>
        <ShowErrorMessage />
      </Suspense>
        {/* {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200 dark:border-red-900/30">
            <AlertCircle size={16} />
            {error}
          </div>
        )} */}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-accent-500/20 dark:shadow-accent-900/20 text-sm font-semibold text-white bg-accent-600 hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-charcoal-900 focus:ring-accent-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading && !loadingText.includes('Google') && !loadingText.includes('Provisioning') ? (
            <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                <span>{loadingText || 'Signing In...'}</span>
            </div>
          ) : (
            <>
              Sign In
              <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </form>
        
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-charcoal-800">
        <button 
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-charcoal-700 hover:border-accent-500 dark:hover:border-accent-500 bg-transparent text-sm font-medium text-slate-600 dark:text-charcoal-400 hover:text-accent-600 dark:hover:text-accent-400 transition-all disabled:opacity-50 group"
        >
           {isLoading && loadingText.includes('Provisioning') ? (
             <div className="flex items-center justify-center w-full gap-2">
               <Loader2 size={16} className="animate-spin text-accent-500" />
               <span className="text-accent-500">{loadingText}</span>
             </div>
           ) : (
             <>
                <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-charcoal-400 group-hover:text-accent-500 transition-colors" />
                    Launch Demo Instance
                </span>
                <span className="text-xs bg-gray-100 dark:bg-charcoal-800 px-2 py-1 rounded text-charcoal-500">Populated Data</span>
             </>
           )}
        </button>
      </div>
    </>
  );
}

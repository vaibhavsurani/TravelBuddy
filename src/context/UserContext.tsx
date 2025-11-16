import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

// Define the shape of a pending booking
interface PendingBooking {
  destinationId: string;
  packageId: string;
  date: string;
}

// Define the shape of the profile data
interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string; // <-- ADD THIS LINE
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  // Add a function to set the pending booking
  setPendingBooking: (booking: PendingBooking | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Add state for the pending booking
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch profile data when user changes
  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase
        .from('profiles')
        .select('*') // This will now also select the 'role' column
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching profile:', error);
          }
          setProfile(data);
          setLoading(false);
        });
        
      // *** NEW LOGIC: Check for a pending booking after login ***
      if (pendingBooking) {
        // User just logged in and has a pending booking, redirect to register
        router.push(
          `/register?destinationId=${pendingBooking.destinationId}&packageId=${pendingBooking.packageId}&date=${encodeURIComponent(
            pendingBooking.date
          )}`
        );
        setPendingBooking(null); // Clear the pending booking
      }
      
    } else {
      setProfile(null);
    }
    // Add pendingBooking and router to dependency array
  }, [user, pendingBooking, router]); 

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    router.push('/'); // Redirect to home on logout
  };

  const value = {
    session,
    user,
    profile,
    loading,
    logout,
    setPendingBooking, // Expose the setter function
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Create a custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
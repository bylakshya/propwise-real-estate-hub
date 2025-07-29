
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types/project';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  updateUserRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          // Fetch or create user profile
          const supabaseUser = session.user;
          let profile: User = {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            name: supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || '',
            profileImage: supabaseUser.user_metadata?.avatar_url,
          };

          // Check if user has a role
          const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', supabaseUser.id)
            .single();

          if (userRole) {
            profile.role = userRole.role;
          }

          setUser(profile);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const supabaseUser = session.user;
        setTimeout(async () => {
          let profile: User = {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            name: supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || '',
            profileImage: supabaseUser.user_metadata?.avatar_url,
          };

          const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', supabaseUser.id)
            .single();

          if (userRole) {
            profile.role = userRole.role;
          }

          setUser(profile);
          setIsLoading(false);
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  };

  const signup = async (email: string, password: string, name?: string): Promise<{ error?: string }> => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name || '',
          full_name: name || '',
        }
      }
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      }
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  const updateUserRole = async (role: UserRole): Promise<void> => {
    if (user) {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: user.id, 
          role: role as any // Type assertion since the types file hasn't updated yet
        });

      if (!error) {
        setUser({ ...user, role });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        signInWithGoogle,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

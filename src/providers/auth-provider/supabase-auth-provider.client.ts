"use client";

import { AuthProvider } from "@refinedev/core";
import { supabaseBrowserClient as supabase } from "../../../lib/supabase/client";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.message,
        },
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Login failed",
      },
    };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      return {
        id: user.id,
        name: user.email,
        email: user.email,
        avatar: user.user_metadata?.avatar_url,
      };
    }

    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};

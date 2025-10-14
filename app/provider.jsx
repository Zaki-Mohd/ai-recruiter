"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState, useContext } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    try {
      // Use dummy user if Supabase is not configured (dev mode)
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy")
      ) {
        setUser({
          id: "dummy-id",
          email: "dummy@example.com",
          name: "Dummy User",
          picture: "/logo.png",
        });
        return;
      }

      // Normal Supabase fetch
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      console.log(Users);

      if (!Users || Users.length === 0) {
        const { data, error } = await supabase.from("Users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);
        console.log(data);
        setUser(data?.[0]);
        return;
      }

      setUser(Users[0]);
    } catch (err) {
      console.error("Error creating/fetching user:", err);
      // Fallback dummy user
      setUser({
        id: "dummy-id",
        email: "dummy@example.com",
        name: "Dummy User",
        picture: "/logo.png",
      });
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};

"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React,{useEffect, useState,useContext} from "react";
function Provider({children}) {
    const [user,setUser]=useState();

    useEffect(() =>{
        // Check for existing session on mount
        checkAndCreateUser();

        // Listen for auth state changes (handles OAuth callback tokens from URL hash)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    await handleUserSession(session.user);
                }
                if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const checkAndCreateUser = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
            await handleUserSession(authUser);
        }
    };

    const handleUserSession = async (authUser) => {
        if (!authUser?.email) return;
        
        //check if user exists
        let {data:Users,error}=await supabase
            .from('Users')
            .select('*')
            .eq('email',authUser.email);
        
        //if user does not exist, create a new user
        if(!Users || Users.length === 0){
           const { data,error}=await supabase.from('Users')
               .insert([
                {
                    name:authUser.user_metadata?.name,
                    email:authUser.email,
                    picture:authUser.user_metadata?.picture
                }
               ])
               .select();
               if(data && data.length > 0){
                   setUser(data[0]);
               }
               return;
        }
        setUser(Users[0]);
    };

return (
    <UserDetailContext.Provider value={{user,setUser}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
)
}
export default Provider;

export const useUser=() => {
    const context=useContext(UserDetailContext);
    return context;
}
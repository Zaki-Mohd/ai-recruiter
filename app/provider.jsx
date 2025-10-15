"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { supabase, isSupabaseConfigured } from "@/services/supabaseClient";
import React,{useEffect, useState,useContext} from "react";
function Provider({children}) {
    const [user,setUser]=useState();
    useEffect(() => {
        if (!isSupabaseConfigured) return; // Skip when Supabase isn't configured
        CreateNewUser();
    }, []);
const CreateNewUser=() => {
    supabase.auth.getUser().then(async({ data: { user } }) => {
    //check if user exists
        let {data:Users,error}=await supabase
            .from('Users')
            .select('*')
            .eq('email',user?.email);
        console.log(Users)
        //if user does not exist, create a new user
        if(Users?.length==0){
           const { data,error}=await supabase.from('Users')
               .insert([
                {
                    name:user?.user_metadata?.name,
                    email:user?.email,
                    picture:user?.user_metadata?.picture
                }
               ]) 
               console.log(data);
               setUser(data);
                return;
        }
        setUser(Users[0]);
    })
}
return (
    <ThemeProvider>
        <UserDetailContext.Provider value={{user,setUser}}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    </ThemeProvider>
)
}
export default Provider;

export const useUser=() => {
    const context=useContext(UserDetailContext);
    return context;
}
"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import { ThemeProvider } from "next-themes";
import React,{useEffect, useState,useContext, createContext} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Create theme context
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

function Provider({children}) {
    const [user,setUser]=useState();
    const [theme, setTheme] = useState("light");
    useEffect(() => {
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

    // Apply theme on initial render and handle changes
    useEffect(() => {
        // First try to get theme from localStorage
        const savedTheme = localStorage.getItem("theme");
        // If no saved theme, check system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
          ? "dark" 
          : "light";
        
        // Set initial theme
        const initialTheme = savedTheme || systemTheme;
        setTheme(initialTheme);
        
        // Apply theme to document
        if (initialTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
  
        // Listen for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
            document.documentElement.classList.toggle("dark", e.matches);
          }
        };
        
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }, []);
  
      // Toggle theme function
      const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      };

return (
    <UserDetailContext.Provider value={{user,setUser}}>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div>{children}</div>
    </ThemeContext.Provider>
    </UserDetailContext.Provider>
)
}
export default Provider;

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider>{children}</Provider>
        </ThemeProvider>
    );
}

export const useUser=() => {
    const context=useContext(UserDetailContext);
    return context;
}
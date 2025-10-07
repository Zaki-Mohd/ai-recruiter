"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState, useContext } from "react";

function Provider({ children }) {
    const [user, setUser] = useState(null); // Initialize user as null or an empty object

    useEffect(() => {
        // Only run CreateNewUser once on mount
        CreateNewUser();
    }, []);

    const CreateNewUser = async () => { // Made this function async
        try {
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                console.error("Supabase Auth Error:", authError);
                setUser(null); // Clear user if there's an auth error
                return;
            }

            if (!authUser) {
                console.log("No authenticated user found.");
                setUser(null); // No user logged in
                return;
            }

            // --- Check if user exists in our 'users' table ---
            // IMPORTANT: Changed 'Users' to 'users' (all lowercase)
            let { data: UsersFromDb, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', authUser?.email);

            if (fetchError) {
                console.error("Error fetching user from DB:", fetchError);
                setUser(null);
                return;
            }

            console.log("Users from DB:", UsersFromDb);

            // If user does not exist in our 'users' table, create a new user
            if (!UsersFromDb || UsersFromDb.length === 0) {
                console.log("User not found in DB, creating new entry.");
                const { data: newUserData, error: insertError } = await supabase.from('users') // Changed 'Users' to 'users'
                    .insert([
                        {
                            name: authUser?.user_metadata?.name,
                            email: authUser?.email,
                            picture: authUser?.user_metadata?.picture
                        }
                    ])
                    .select(); // Add .select() to get the inserted data back

                if (insertError) {
                    console.error("Error inserting new user:", insertError);
                    setUser(null);
                    return;
                }
                console.log("New user created:", newUserData);
                // Set the user from the newly inserted data, which will be an array
                if (newUserData && newUserData.length > 0) {
                    setUser(newUserData[0]);
                } else {
                    setUser(null);
                }
            } else {
                // If user exists, set the user from the fetched data
                console.log("User found in DB:", UsersFromDb[0]);
                setUser(UsersFromDb[0]);
            }

        } catch (error) {
            console.error("General error in CreateNewUser:", error);
            setUser(null);
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
    if (context === undefined) {
        throw new Error('useUser must be used within a Provider');
    }
    return context;
};
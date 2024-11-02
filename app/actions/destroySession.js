"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destroySession(){
    // Retrieving the session cookie
    const sessionCookie = cookies().get("appwrite-session");

    if (!sessionCookie){
        return {
        error: "No session cookie found"
        }
    }
    try {
        const { account } = await createSessionClient(sessionCookie.value);

        //Delete Current Session
        await account.deleteSession("current");

        // Clear Session Cookie
        cookies().delete("appwrite-session");

        return {
            success : true,
        }
        
    } catch (error) {
        
        return {
            error: "Error deleting session " + error
        }
        
    }
}

export default destroySession;

"use server";
import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID, Name } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom (previousState , formData) {
    //Get databases instance
    const { databases, storage } = await createAdminClient();

    try { 
        const { user } = await checkAuth ();

        if (!user) {
            return {
                error : "You must be logged in to create a room"
            }
        }
        // Uploading Image

        let imageID;

        const image = formData.get("image");

        if (image && image.size>0 && image.name !== undefined) {
            //Upload
            try {
                const response = await storage.createFile("rooms", ID.unique(), image);
                
            } catch (error) {
                
            }
        }

        // Create rooms

        const newRoom = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            ID.unique(),
            {
                user_id : user.id,
                name : formData.get("name"),
                description : formData.get("description"),
                sqft : formData.get("sqft"),
                capasity : formData.get("capasity"),
                location : formData.get("location"),
                address : formData.get("address"),
                availability : formData.get("availability"),
                price_per_hour : formData.get("price_per_hour"),
                amenities : formData.get("amenities"),

            }
        );

        revalidatePath("/", "layout");
        return{
            success : true
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.response.message || "An unexpected error has occured"
        return{
            error : errorMessage
        };       
    }
    
}

export default createRoom;
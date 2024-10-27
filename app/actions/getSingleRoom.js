"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


async function getSingleRooms(id) {

    try {
        const { databases } = await createAdminClient();

        // Fetch Rooms
        const  room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            id
        );
        //Revalide the cache for this pathway
        revalidatePath("/", "layout");

        return (room);

    } catch (error) {
        console.log("Failed to get room ", error);
        redirect("/error")

    }

}

export default getSingleRooms;
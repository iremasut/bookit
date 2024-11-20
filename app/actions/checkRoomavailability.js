"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

//Convert a date stringto a luxon DateTime object in UTC
function toUTCDateTime(dateSring) {
    return DateTime.fromISO(dateSring, {zone: "utc"}).toUTC();
}
//Check for overlapping date range
function dateRangesOverlap(check_inA, check_outA, check_inB, check_outB) {
    return check_inA < check_outB && check_outA > check_inB;
}

async function checkRoomAvailability(roomId, check_in, check_out) {
    const sessionCookie = cookies().get("appwrite-session");
    if(!sessionCookie) {
        redirect ("/login");
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        const checkInDateTime = toUTCDateTime(check_in);
        const checkOutDateTime = toUTCDateTime(check_out);

       //Fetch all bookings for a given room
       const { documents: bookings } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        [Query.equal("room_id", roomId)]
    );
    //Loop over bookings and check for overlaps
    for (const booking of bookings) {
        const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
        const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

        if (dateRangesOverlap(
            checkInDateTime,
            checkOutDateTime,
            bookingCheckInDateTime,
            bookingCheckOutDateTime,
        )) {
            return false; //Overlap found, do not book
        }

    }
    //No overlap found, continue to book
    
    return true;
    
    } catch (error) {
        console.log("Failed to check room availability ", error);
        return{
            error: "Failed to check room availability"
        }

    }

}

export default checkRoomAvailability;
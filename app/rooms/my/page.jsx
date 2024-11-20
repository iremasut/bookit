import Heading from "@/components/Heading";
import MyRoomCard from "@/components/myRoomCard";
import getMyRooms from "@/app/actions/getMyRooms";

const MyRoomsPage = async() => {
    const rooms = await getMyRooms();
    return  <>
        <Heading title = "My Rooms"/>
        {rooms.length > 0 ? (
            rooms.map((room) => <MyRoomCard key={room.$id} room={room}/>)
        ) : (
            <p>You have no rooms listings</p>
        )}
    </>;
};
 
export default MyRoomsPage;
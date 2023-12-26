import {ChangeEvent, useEffect, useState} from "react";
import {getRoomTypes} from "../utils/ApiFunctions.ts";

// @ts-ignore
export function RoomTypeSelector({handleRoomInputChange, newRoom}) {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, []);

    const handleNewTypeRoomInputChange = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select className={"form-select"} name="roomType" id="roomType" value={newRoom.roomType} onChange={(e) => {
                        if(e.target.value === "Add New"){
                            setShowNewRoomTypeInput(true)
                        }else {
                            handleNewTypeRoomInputChange(e)
                        }
                    }}>
                        <option value={""}>select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                        </select>
                    {showNewRoomTypeInput && (
                        <div className={"input-group mt-2"}>
                            <input className={"form-control"} type="text" placeholder={"Enter a new room type"} onChange={handleNewTypeRoomInputChange}/>
                            <button className={"btn btn-hotel"} type={"button"} onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}

        </>
    );
}
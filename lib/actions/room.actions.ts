"use server";

import { revalidatePath } from "next/cache"
import { liveblocks } from "../liveblocks"
import {nanoid} from 'nanoid'
import { parseStringify } from "../utils";
export const createDocument = async ({email, userId}:CreateDocumentParams)=>{
    try {
        const roomId = nanoid()
        const metadata = {
            creatorId: userId,
            email,
            title:'Untitled'
        }
        const usersAccesses:RoomAccesses = {
            //email thaklei(account banatei hobe liveblocks) 
            //room e access pabe and edit korbe
            [email]:["room:write"]
        }
        const room = await liveblocks.createRoom(
            roomId,{
                metadata,
                defaultAccesses:["room:write"],//je kew dekhte pabe if "room:write"
                usersAccesses
            }
        )
        revalidatePath("/")

        return parseStringify(room)
    } catch (error) {
        console.log(`Error happend while creating a room: ${error}`);
        
    }
    
}

export const getDocument = async ({roomId,userId}:{roomId: string, userId: string})=>{
    try {
        const room = await liveblocks.getRoom(roomId)
        const hasAccess = Object.keys(room.usersAccesses).includes(userId)

        if(!hasAccess)
            throw new Error("You don't have access to this document!")

        return parseStringify(room)

    } catch (error) {
        console.log(`Error fetching room ${error}`);
        
    }
}
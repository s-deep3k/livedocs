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
            [email]:["room:write"]
        }
        const room = await liveblocks.createRoom(
            roomId,{
                metadata,
                defaultAccesses:[],
                usersAccesses
            }
        )
        revalidatePath("/")

        return parseStringify(room)
    } catch (error) {
        console.log(`Error happend while creating a room: ${error}`);
        
    }
    
}
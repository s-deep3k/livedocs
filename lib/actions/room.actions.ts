"use server";

import { revalidatePath } from "next/cache"
import { liveblocks } from "../liveblocks"
import {nanoid} from 'nanoid'
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { title } from "process";
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

export const updateDocument = async (roomId: string, title: string)=>{
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId,{
            metadata:{
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom)
    } catch (error) {
        console.log(`Error updating room title: ${error}`);
        
    }
}

export const getDocuments = async (email : string)=>{
    try {
        const rooms = await liveblocks.getRooms({userId:email})
        return parseStringify(rooms)

    } catch (error) {
        console.log(`Error fetching rooms ${error}`);
        
    }
}

export const updateDocumentAccess = async ({roomId, email, userType, updatedBy}:ShareDocumentParams)=>{
    try {
        const usersAccesses:RoomAccesses = {
            [email]: getAccessType(userType) as AccessType
        }

        const room = await liveblocks.updateRoom(roomId,{
            usersAccesses 
        })
        if(room){
            const notificationId = nanoid()
            await liveblocks.triggerInboxNotification({
                userId:email,
                kind:'$documentAccess',
                subjectId: notificationId,
                activityData:{
                    userType,
                    title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
                    updatedBy:updatedBy.name,
                    email:updatedBy.email,
                    avatar: updatedBy.avatar
                },
                roomId
            })
        }
            // TODO: Send notification
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(room)
    } catch (error) {
        console.log(`error while updating document access ${error}`);
        
    }
}

export const removeCollaborator = async ({roomId, email}:{email:string, roomId: string})=>{
    try {
        const room = await liveblocks.getRoom(roomId)

        if(room.metadata.email === email)
            throw new Error("You cannot remove yourself from the document!")
        const updatedRoom = await liveblocks.updateRoom(roomId,{
            usersAccesses :{ [email]:null}
        })
        
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(room)
    } catch (error) {
        console.log(`error while removing collaborator ${error}`);
        
    }
}

export const deleteDocument = async (roomId:string)=>{
    try {
        await liveblocks.deleteRoom(roomId)
        revalidatePath('/')
        redirect('/')
    } catch (error) {
        console.log(`Error while deleting document ${error}`);
        
    }
    

}
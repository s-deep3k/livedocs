'use client';

import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";


const Notification = () => {
    const unreadNotifications =[]
    const [count, setCount]= useState(0)
  return (
    <Popover>
        <PopoverTrigger className="relative flex size-10 items-center justify-center 
        rounded-lg">
            <Image
            src={'/assets/icons/bell.svg'}
            alt="inbox"
            width={24}
            height={24}
            />
            {count>0 && (
                <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500"/>
            )}
        </PopoverTrigger>
        <PopoverContent align="end" className="shad-popover">
            <LiveblocksUIConfig
            overrides={{INBOX_NOTIFICATION_TEXT_MENTION:(user:React.ReactNode)=>(
                <>{user} mentioned you.</>
            )
        }}
            >
                <InboxNotificationList/>
                {unreadNotifications.length <=0 && (
                    <p className="py-2 text-center text-dark-500">No new notifications</p>
                ) }
            </LiveblocksUIConfig>
        </PopoverContent>
    </Popover>
  )
}

export default Notification
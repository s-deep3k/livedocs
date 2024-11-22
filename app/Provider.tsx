"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider 
      authEndpoint={'/api/liveblocks-auth'}
     // resolveUsers={async()=>{await getClerkUsers()}}
      >
        <ClientSideSuspense fallback={<Loader/>}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  );
}
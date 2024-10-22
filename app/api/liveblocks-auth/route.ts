import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export async function POST(req: Request) {
  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */

  // Get the current user from your database
  const clerkUser = await currentUser()
  if(!clerkUser) redirect("/sign-in")

  const {id, firstName, lastName, imageUrl, emailAddresses,} = clerkUser
    const user = {
        id,
        info:{
            name:`${firstName} ${lastName}`,
            avatar: imageUrl,
            email: emailAddresses[0].emailAddress,
            color: getUserColor(id)
        }
    }
  // Create an ID token for the user
  //Identify user and return the result
  const { status , body} = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[],
    },
    {
      userInfo: user.info,
    }
  );

  return new Response(body, { status });
}
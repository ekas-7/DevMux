import NextAuth, { DefaultSession} from "next-auth";
import { authOptions } from "@/lib/googe";




declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"]
    }
    interface User {
        id: string;
    }
}



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
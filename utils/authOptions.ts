import  {NextAuthOptions, Session, User} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import isUser from "@/actions/FetchUser"; 
import { JWT } from 'next-auth/jwt';


// authOptions Object
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          // `name` of the type of the authentication 
          name: "Credentials",
          // `credentials` to specifies the types of credentials that NextAuht will accept
          credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" }
          },
          // `authorize` handler function that accept `credentials` provided by the user via req
          async authorize(credentials) {
         // Ensure that both email and password are provided
         if (credentials) {
          const user = await isUser({credentials:credentials});
          //152@hH
          if(user)
          return {
            id:user.id,
            name:user.name,
            email:user.email,
          } as User;
        
        
        }
        // Return null to indicate failed authentication
        return null;
      },
    }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({token, user, trigger, session }) {
        if (user) {
          // assign the user object to the JWT TOKEN
          token.user = user;
        }
        return token;
      },
      async session({ session, token }:{session:Session, token:JWT}) {
        
        if (token && token.user) {
          session.user = token.user 
        }
        return session;
      },
    },
    
    pages: {
      signIn: '/login',
    }
  };
// authjs import options
import NextAuth, {type NextAuthConfig} from 'next-auth'
import Keycloak from "next-auth/providers/keycloak";
import { type Adapter } from "@auth/core/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {db} from "@/server/db";

const prismaAdapter: Adapter = PrismaAdapter(db);

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            image: string
        }
    }
}


const config: NextAuthConfig = {
    providers:[
        Keycloak({
            clientId: process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.NEXTAUTH_KEYCLOAK_ISSUER,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter:prismaAdapter,
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            // console.log("signIn", user, account, profile);
            return true;
        },
        redirect: async ({url, baseUrl}) => {
            // console.log("redirect", url, baseUrl);
            return url;
        },
        session: async ({session, user}) => {
            // console.log("session", session);
            // console.log("user", user);

            const newSession = {
                ...session,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            }
            return newSession;
        },
        jwt: async ({token, user, account, profile}) => {
            // console.log("jwt", token, user, account, profile);
            return token;
        },
    },
    // events:{
    //     // createUser: async (message) => {
    //     //     console.log("createUser", message);
    //     // },
    //     // linkAccount: async (message) => {
    //     //     console.log("linkAccount", message);
    //     // },
    //     // session: async (message) => {
    //     //     console.log("session", message);
    //     // },
    //     // signIn: async (message) => {
    //     //     console.log("signIn", message);
    //     // },
    //     // signOut: async (message) => {
    //     //     console.log("signOut", message);
    //     // },
    //     // updateUser: async (message) => {
    //     //     console.log("updateUser", message);
    //     // },
    // },
    trustHost:true,
    // logger: {
    //     error: console.error,
    // },
}

export const {
    handlers: {GET,POST},
    auth
} = NextAuth(config);

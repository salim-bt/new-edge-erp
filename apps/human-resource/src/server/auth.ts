import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import KeyCloakProvider from "next-auth/providers/keycloak";
import { env } from "@/env";
import { db } from "@/server/db";
import { info } from "console";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }
    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

const prismaAdapter = PrismaAdapter(db);

const MyAdapter = {
    ...prismaAdapter,
    linkAccount: (account) => {
        account["not_before_policy"] = account["not-before-policy"];
        delete account["not-before-policy"];
        return prismaAdapter.linkAccount(account);
    },
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => {
            console.log("session");
            console.log(session);
            console.log(user);
            return{
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }},
    },
    events: {
        async signOut() {
            console.log("signOut");
            const res = await fetch(`http://localhost:8080/auth/realms/neterp/protocol/openid-connect/logout`);
            console.log(res);
        }
    },
    adapter: MyAdapter,
    providers: [
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
        KeyCloakProvider({
            // @ts-ignore
            clientId: process.env.KEYCLOAK_ID,
            // @ts-ignore
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

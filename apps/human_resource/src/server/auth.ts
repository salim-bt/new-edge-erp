import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import KeyCloakProvider from "next-auth/providers/keycloak";
import { env } from "@/env";
import { db } from "@/server/db";
import { Adapter } from "next-auth/adapters";
// @ts-ignore
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    // keycloak provider interfaces
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
        idToken: string;
        accessToken: string;
        roles: string[];
    }
}

async function refreshAccessToken(token: JWT) {
    const resp = await fetch(`${env.REFRESH_TOKEN_URL}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.KEYCLOAK_CLIENT_ID,
        client_secret: env.KEYCLOAK_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token as string,
      }),
      method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
      ...token,
      access_token: refreshToken.access_token,
      decoded: jwtDecode(refreshToken.access_token),
      id_token: refreshToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken.refresh_token,
    };
}

const prismaAdapter = PrismaAdapter(db);
// @ts-ignore
const keycloakAdapter: Adapter<boolean> = {
    ...prismaAdapter,
    // @ts-ignore
    linkAccount: (account) => {
        account["not_before_policy"] = account["not-before-policy"];
        delete account["not-before-policy"];
        // @ts-ignore
        return prismaAdapter.linkAccount(account);
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
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
            clientId: env.KEYCLOAK_CLIENT_ID,
            clientSecret: env.KEYCLOAK_CLIENT_SECRET,
            issuer: env.KEYCLOAK_ISSUER,

        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000)
            console.log("jwt", token);
            console.log("account", account);
            if (account) {
                // account is only available the first time this callback is called on a new session (after the user signs in)
                // @ts-ignore
                token.decoded = jwtDecode(account.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
                // @ts-ignore
            } else if (nowTimeStamp < token.expires_at) {
                // token has not expired yet, return it
                console.log("Token has not expired yet.")
                return token;
            } else {
                // token is expired, try to refresh it
                console.log("Token has expired. Will refresh...")
                try {
                    const refreshedToken = await refreshAccessToken(token);
                    console.log("Token is refreshed.")
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },
        session: async ({ session, token, user }) => {
            console.log("session", session);
            console.log("token", token);
            console.log("user", user);
            const obj = {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
            
            console.log("obj", obj);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        }
    },
    adapter: keycloakAdapter,
    debug: true,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

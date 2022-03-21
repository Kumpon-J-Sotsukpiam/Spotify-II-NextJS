import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token: any) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            acccessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: <string>process.env.SPOTIFY_CLIENT_ID,
            clientSecret: <string>process.env.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    acccessTokenExpires: Number(account?.expires_at) * 1000,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                }
            }
            if (Date.now() < Number(account?.expires_at) * 1000) {
                return token;
            }
            return await refreshAccessToken(token);
        },
        async session({ session, token }: any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    }
})
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;
        
        // Plaintext comparison as requested by user
        if (user.password !== credentials.password) return null;
        if (user.banned === 'ON') return null;

        return {
          id: String(user.id),
          username: user.username,
          balance: user.balance,
          luong: user.luong,
          level: user.level,
          coin: user.coin,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.balance = user.balance;
        token.luong = user.luong;
        token.level = user.level;
        token.coin = user.coin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.balance = token.balance;
        session.user.luong = token.luong;
        session.user.level = token.level;
        session.user.coin = token.coin;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'hoiuc2018-secret-key-change-in-production',
});

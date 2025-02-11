import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRoleDB } from '@prisma/client';


export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: 'USER' as UserRoleDB,
				};
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const values = {
					email: credentials.email,
				};

				const findUser = await prisma.userDB.findFirst({
					where: values,
				});

				if (!findUser) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password
				);

				if (!isPasswordValid) {
					return null;
				}

				if (!findUser.verified) {
					return null;
				}

				return {
					id: findUser.id,
					email: findUser.email,
					name: findUser.fullName,
					role: findUser.role,
				};
			},
		}),
		// ...add more providers here
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
			  if (account?.provider === 'credentials') {
				return true;
			  }
	  
			  console.log(user, account);
	  
			  if (!user.email) {
				return false;
			  }
	  
			  const findUser = await prisma.userDB.findFirst({
				where: {
				  OR: [
					{ provider: account?.provider, providerId: account?.providerAccountId },
					{ email: user.email },
				  ],
				},
			  });
	  
			  if (findUser) {
				await prisma.userDB.update({
				  where: {
					id: findUser.id,
				  },
				  data: {
					provider: account?.provider,
					providerId: account?.providerAccountId,
				  },
				});
				return true;
			  }
	  
			  await prisma.userDB.create({
				data: {
				  email: user.email,
				  fullName: user.name || 'User #' + user.id,
				  password: hashSync(user.id.toString(), 10),
				  verified: new Date(),
				  provider: account?.provider,
				  providerId: account?.providerAccountId,
				},
			  });
	  
			  return true;
			} catch (error) {
			  console.log(error);
			  return false;
			}
		  },
		async jwt({ token }) {

			if (!token.email) {
				return token;
			}
			const findUser = await prisma.userDB.findFirst({
				where: {
					email: token.email,
				},
			});

			if (findUser) {
				token.id = String(findUser.id);
				token.email = findUser.email;
				token.name = findUser.fullName;
				token.role = findUser.role;
			}

			return token;
		},

		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}

			return session;
		},
	},
};
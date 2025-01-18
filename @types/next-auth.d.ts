// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { UserRoleDB } from '@prisma/client';
import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Расширение интерфейса `Session` для хранения дополнительных полей
	 * из таблицы `users` в сессии.
	 *
	 * @prop {User} user - Данные пользователя
	 * @prop {string} user.id - ID пользователя в БД
	 * @prop {UserRoleDB} user.role - Роль пользователя
	 * @prop {string} user.name - Имя пользователя
	 * @prop {string} user.image - URL аватара пользователя
	 */
	interface Session {
		user: {
			user: any;
			id: string;
			role: UserRoleDB;
			name: string;
			image: string;
		};
	}

	/**
	 * Расширение интерфейса `User` для хранения ID пользователя в БД.
	 *
	 * @prop {number} id - ID пользователя в БД
	 * @prop {UserRoleDB} role - Роль пользователя
	 */
	interface User extends DefaultUser {
		id: number;
		role: UserRoleDB;
	}
}

declare module 'next-auth/jwt' {
	/**
	 * Расширение интерфейса `JWT` для хранения ID пользователя в БД.
	 *
	 * @prop {string} id - ID пользователя в БД
	 * @prop {UserRoleDB} role - Роль пользователя
	 */
	interface JWT extends DefaultJWT {
		id: string;
		role: UserRoleDB;
	}
}


import * as React from 'react';

interface Props {
	code: string
}

export const VerificationUserTemplate: React.FC<Props> = ({
	code
}) => (
	<div>
		<h1>Подтверждение аккаунта</h1>
		<p>
			Здравствуйте, этим письмом мы уведомляем Вас о необходимости подтверждения аккаунта.
		</p>
		<hr />
		<p>
			Код подтверждения: <b><h2>{code}</h2></b>
		</p>
		<p>
			Перейдите <b><a href={`https://vibe-cars.vercel.app/api/auth/verify?code=${code}`}>по этой ссылке</a></b> для подтверждения аккаунта.
		</p>
		<hr />
		<p>
			Спасибо, Ваш VIBE CARS.
			<br />
			Сервис проката автомобилей
			<br />
			ул. Нововитебская, 138А
		</p>
	</div>
);

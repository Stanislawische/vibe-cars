'use client';

import { Button } from '@/shared/components/ui';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/shared/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
	open: boolean;
	onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login');

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login');
	};
	const handleClose = () => {
		onClose();
	};
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="w-[450px] ">
				<VisuallyHidden.Root>
					<DialogDescription />
					<DialogTitle />
				</VisuallyHidden.Root>
                {
                    type === 'login' ? (
                        <LoginForm onClose={handleClose} />
                    ) : (
                        <RegisterForm onClose={handleClose} />
						
                    )
                }
				<hr />
				
                <Button onClick={onSwitchType} type='button' className='h-10 text-base '>
                    {type === 'login' ? 'Регистрация' : 'Вход'}
                </Button>
			</DialogContent>
		</Dialog>
	);
};

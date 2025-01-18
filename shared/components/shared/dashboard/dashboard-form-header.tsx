
import React from 'react';
import { Button } from '../../ui';
import { cn } from '@/shared/lib/utils';
import { Tabs, TabsTrigger } from '../../ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';

interface Props {
  isEdit?: boolean;
  loading?: boolean;
  className?: string;
}

export const DashboardFormHeader: React.FC<Props> = ({ isEdit, loading, className }) => {
  return (
    <div className={cn('flex justify-between items-center mb-7', className)}>
      <Tabs defaultValue={isEdit ? 'edit' : 'create'} >
        <TabsList className='bg-secondary-foreground rounded-lg'>
          <TabsTrigger value="create" className='h-10 m-1'>Создание</TabsTrigger>
          <TabsTrigger value="edit" className='h-10 m-1'>Редактирование</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button loading={loading}>Сохранить</Button>
    </div>
  );
};


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
    <div className={cn('flex justify-between items-center my-5', className)}>
      <h1 className="font-extrabold text-3xl">{isEdit ? 'Редактирование' : 'Создание'}</h1>
      <Button loading={loading}>Сохранить</Button>
    </div>
  );
};

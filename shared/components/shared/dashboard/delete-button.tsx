'use client';

import {
  deleteCategory,
  deletePLans,
  deleteProduct,
  deleteProductItemDB,
  deleteUser,
} from '@/app/actions';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui';

interface Props {
  id: number;
  type: 'user' | 'category' | 'product' | 'plan'  | 'product-items';
}

export const DeleteButton: React.FC<Props> = ({ id, type }) => {
  const onClickRemove = async (id: number) => {
    if (type === 'user') {
      await deleteUser(id);
    } else if (type === 'category') {
      await deleteCategory(id);
    } else if (type === 'product') {
      await deleteProduct(id);
    } else if (type === 'plan') {
      await deletePLans(id);
    } else if (type === 'product-items') {
      await deleteProductItemDB(id);
    }
  };

  return (
    <Button onClick={() => onClickRemove(id)} className="w-10 h-10 p-0 text-white">
      <Trash2 size={16} />
    </Button>
  );
};

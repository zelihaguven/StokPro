
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductFormActionsProps {
  product?: Product | null;
  loading: boolean;
  onCancel: () => void;
}

const ProductFormActions = ({ product, loading, onCancel }: ProductFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        İptal
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? 'Kaydediliyor...' : product ? 'Güncelle' : 'Ekle'}
      </Button>
    </div>
  );
};

export default ProductFormActions;

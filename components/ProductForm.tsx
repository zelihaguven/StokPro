
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductForm } from '@/hooks/useProductForm';
import { ProductFormProps } from '@/types/product';
import ProductFormFields from '@/components/product/ProductFormFields';
import ProductFormActions from '@/components/product/ProductFormActions';

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const { formData, loading, handleChange, saveProduct } = useProductForm(product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProduct(onSuccess);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{product ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Kapat">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <ProductFormFields formData={formData} onChange={handleChange} />
            <ProductFormActions product={product} loading={loading} onCancel={onCancel} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;

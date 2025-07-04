
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductFormData } from '@/types/product';

const DEFAULT_FABRIC_STATUS = 'kumaş sipariş edildi';

export const useProductForm = (product?: Product | null) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    model: '',
    stock_quantity: '',
    min_stock_level: '',
    color: '',
    order_number: '',
    ordering_brand: '',
    fabric_number: '',
    fabric_status: DEFAULT_FABRIC_STATUS,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? '',
        model: product.model ?? '',
        stock_quantity: product.stock_quantity != null ? product.stock_quantity.toString() : '',
        min_stock_level: product.min_stock_level != null ? product.min_stock_level.toString() : '',
        color: product.color ?? '',
        order_number: product.order_number ?? '',
        ordering_brand: product.ordering_brand ?? '',
        fabric_number: product.fabric_number ?? '',
        fabric_status: product.fabric_status ?? DEFAULT_FABRIC_STATUS,
      });
    }
  }, [product]);

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!user) {
      toast({
        title: 'Hata',
        description: 'Kullanıcı bulunamadı. Lütfen giriş yapın.',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.name.trim()) {
      toast({
        title: 'Hata',
        description: 'Ürün adı zorunludur.',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.stock_quantity.trim() || isNaN(Number(formData.stock_quantity))) {
      toast({
        title: 'Hata',
        description: 'Sipariş adedi geçerli bir sayı olmalıdır.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const saveProduct = async (onSuccess: () => void) => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const productData = {
        user_id: user!.id,
        name: formData.name.trim(),
        model: formData.model.trim() || null,
        stock_quantity: Number(formData.stock_quantity),
        min_stock_level: formData.min_stock_level.trim() ? Number(formData.min_stock_level) : null,
        color: formData.color.trim() || null,
        order_number: formData.order_number.trim() || null,
        ordering_brand: formData.ordering_brand.trim() || null,
        fabric_number: formData.fabric_number.trim() || null,
        fabric_status: formData.fabric_status || null,
        updated_by: user!.id,
        ...(product ? {} : { created_by: user!.id }),
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Ürün başarıyla güncellendi.',
        });
      } else {
        const { error } = await supabase.from('products').insert([productData]);

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Ürün başarıyla eklendi.',
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Hata',
        description: 'Ürün kaydedilirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    saveProduct,
  };
};

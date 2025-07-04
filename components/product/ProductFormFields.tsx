
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFormData } from '@/types/product';

interface ProductFormFieldsProps {
  formData: ProductFormData;
  onChange: (field: keyof ProductFormData, value: string) => void;
}

const ProductFormFields = ({ formData, onChange }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Ürün Adı *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={e => onChange('name', e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={e => onChange('model', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color">Renk</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={e => onChange('color', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="order_number">Sipariş No</Label>
          <Input
            id="order_number"
            value={formData.order_number}
            onChange={e => onChange('order_number', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ordering_brand">Sipariş Veren Marka</Label>
          <Input
            id="ordering_brand"
            value={formData.ordering_brand}
            onChange={e => onChange('ordering_brand', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fabric_number">Kumaş No</Label>
          <Input
            id="fabric_number"
            value={formData.fabric_number}
            onChange={e => onChange('fabric_number', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="fabric_status">Kumaş Durumu</Label>
        <Select
          value={formData.fabric_status}
          onValueChange={value => onChange('fabric_status', value)}
        >
          <SelectTrigger aria-label="Kumaş Durumu Seçimi">
            <SelectValue placeholder="Kumaş durumu seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kumaş sipariş edildi">Kumaş Sipariş Edildi</SelectItem>
            <SelectItem value="kumaş geldi">Kumaş Geldi</SelectItem>
            <SelectItem value="kumaş kesime girdi">Kumaş Kesime Girdi</SelectItem>
            <SelectItem value="kumaş hazır">Kumaş Hazır</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stock_quantity">Sipariş Adedi *</Label>
          <Input
            id="stock_quantity"
            type="number"
            min={0}
            value={formData.stock_quantity}
            onChange={e => onChange('stock_quantity', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="min_stock_level">Üretim Adedi</Label>
          <Input
            id="min_stock_level"
            type="number"
            min={0}
            value={formData.min_stock_level}
            onChange={e => onChange('min_stock_level', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;

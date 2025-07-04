
export interface Product {
  id: string;
  name: string;
  model?: string | null;
  stock_quantity?: number | null;
  min_stock_level?: number | null;
  color?: string | null;
  order_number?: string | null;
  ordering_brand?: string | null;
  fabric_number?: string | null;
  fabric_status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface ProductFormData {
  name: string;
  model: string;
  stock_quantity: string;
  min_stock_level: string;
  color: string;
  order_number: string;
  ordering_brand: string;
  fabric_number: string;
  fabric_status: string;
}

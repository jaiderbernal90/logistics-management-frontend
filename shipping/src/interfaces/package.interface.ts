export interface Package {
  id?: number;
  weight: number;
  size: string;
  type_of_product: string;
  description: string;
  value: number;
  user_id: number;
  shipment_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface InventarioInterface {
	id_inventario: number;
	id_compras?: string;
	id_venta_detalle?: string;
	cantidad_inventario: number;
	producto_inventario: string;
	foto_producto_inventario: string;
}
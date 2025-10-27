export interface Compras {
	id_compras?: number;
	compra_detalle: string;
	producto_detalle: string;
	titulo_producto: string;
	tipo_moneda: string;
	monto_moneda: number;
	id_inventario: number;
	cantidad_inventario: number;
	foto_producto: string;
}

export interface CompraInterface{
	compra_detalle: string;
	fecha?: string;
	fecha_compra?: string;
	foto_producto: string;
	id_compras?: number;
	id_inventario: number;
	id_moneda: number;
	id_producto: number;
	id_tipo_moneda?: number;
	id_usuario?: number;
	moneda: string;
	monto_moneda: string;
	producto_detalle: string;
	titulo_producto: string;
	cantidad_inventario: string;
	status_compra?: number;
}
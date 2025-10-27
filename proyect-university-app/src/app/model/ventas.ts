export interface VentasInterface {
    venta_detalle: string;
    producto_detalle: string;
    titulo_producto: string;
    tipo_moneda: string;
    monto_moneda: string;
    foto_producto: string;
    idUser: number;
    id_inventario: number;
    cantidad_inventario: number;
    id_producto?: number;
    id_moneda?: number;
    moneda?: string;
    status_venta?: number;
}


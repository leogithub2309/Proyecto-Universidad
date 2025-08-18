export interface Response {
    title: string;
    status: number;
    description?: string;
    result?: any;
}

export class Login {
    username: string = "";
    password: string = "";

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}

export interface Register {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    cedula: number;
    tipo_identidad: string;
    telefono: string;
    direccion_1: string;
    direccion_2: string;  
    codigo_postal: number;
    username: string;
    password: string;
    id_rol:number;
}

export interface Ventas{
    id_inventario: string;
    fecha: string;
    foto_producto: string;
    id_moneda: number;
    id_producto: number;
    id_tipo_moneda:number
    id_usuario: number;
    id_venta_detalle: number;
    moneda: string;
    monto_moneda: string;
    producto_detalle: string;
    titulo_producto: string;
    venta_detalle: string;
    cantidad_inventario: number;
}
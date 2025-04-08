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
    cedula: string;
    tipo_identificacion: string;
    telefono: string;
    direccion_1: string;
    direccion_2: string;  
    codigo_postal: number;
    username: string;
    password: string;
    id_rol:number;
}
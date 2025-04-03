export interface Response {
    title: string;
    status: number;
    description?: string;
    result?: object;
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
    nombre: string;
    cedula: string;
    telefono: string;
    direccion: string;  
    codigo_postal: number;
    username: string;
    password: string;
    id_rol:number;
}
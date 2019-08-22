export interface Mantenimiento{
    id: number;
    id_bien: number,
    mantenimiento : string,
    descripcion : string,
    fecha : string,
    id_tecnico: string,
    estado: string, 
    observacion : string,
    id_tipo_mantenimiento : string,
    programado: string
}

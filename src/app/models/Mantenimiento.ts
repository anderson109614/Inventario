export interface Mantenimiento{
    id_bien: number,
    mantenimiento : string
    descripcion : string
    fecha : Date
    id_tecnico: number,
    estado: string, 
    observacion : string
}

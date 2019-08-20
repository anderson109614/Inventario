export interface Bien{
    id: number;
    identificador: number,
    id_tipo_bien: number,
    serie_identificacion: string,
    modelo: string,
    marca: string,
    critico: string,
    id_moneda: number,
    valor_compra: number,
    recompra: string,
    color: string,
    material: string,
    dimensiones: string,
    id_bodega: number,
    id_acta: number,
    fecha_ingreso: string,
    id_bien_padre: number, 
    codigo: number,
    id_encargado: number,
    img_bien: string
}
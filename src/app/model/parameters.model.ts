import { Projection } from "./enum/projection.enum";

export interface ParametersFilter {    
    projection?: Projection;
    winner?: boolean;
    page?: number;
    size?: number;
    year?: number;    
}
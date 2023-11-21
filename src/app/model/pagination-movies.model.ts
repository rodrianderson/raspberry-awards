import { Movies } from "./movies.model";

export interface PaginationMovies {
    content: Movies[],
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: any;
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean;
    sort: any;
    empty: boolean;
    sorted: boolean,
    unsorted: boolean;
    unpaged: boolean;
    size: number,
    totalElements: number,
    totalPages: number
}
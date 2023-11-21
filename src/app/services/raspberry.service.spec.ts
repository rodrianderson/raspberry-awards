import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';
import { RaspberryService } from './raspberry.service';
import { ParametersFilter } from '../model/parameters.model';


describe('RaspberryService', () => {
    let service: RaspberryService<any>;
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RaspberryService<any>]
        }).compileComponents();
        service = TestBed.inject(RaspberryService<any>);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('service function', () => {
        const parameters: ParametersFilter = {};
        service.getMovies("", parameters)
        expect(service).toBeTruthy();
    });

    it('should search multiple winners for year', () => {        
        service.getMovies("years-with-multiple-winners", {}).subscribe((data) => {
            expect(data).toEqual('www.texoit.com');
        });
        const req = httpMock.expectOne(
            `${environment.api}?projection=years-with-multiple-winners`
        );

        expect(req.request.method).toBe('GET');
        httpMock.verify();
    });
});
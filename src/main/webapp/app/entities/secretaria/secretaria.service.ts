import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Secretaria } from './secretaria.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SecretariaService {

    private resourceUrl = 'api/secretarias';

    constructor(private http: Http) { }

    create(secretaria: Secretaria): Observable<Secretaria> {
        const copy = this.convert(secretaria);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(secretaria: Secretaria): Observable<Secretaria> {
        const copy = this.convert(secretaria);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Secretaria> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(secretaria: Secretaria): Secretaria {
        const copy: Secretaria = Object.assign({}, secretaria);
        return copy;
    }
}

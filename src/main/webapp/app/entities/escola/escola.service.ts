import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Escola } from './escola.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EscolaService {

    private resourceUrl = 'api/escolas';

    constructor(private http: Http) { }

    create(escola: Escola): Observable<Escola> {
        const copy = this.convert(escola);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(escola: Escola): Observable<Escola> {
        const copy = this.convert(escola);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Escola> {
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

    private convert(escola: Escola): Escola {
        const copy: Escola = Object.assign({}, escola);
        return copy;
    }
}

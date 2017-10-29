import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsuarioService {

    private resourceUrl = 'api/usuarios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(usuario: Usuario): Observable<Usuario> {
        const copy = this.convert(usuario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(usuario: Usuario): Observable<Usuario> {
        const copy = this.convert(usuario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Usuario> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.nascimento = this.dateUtils
            .convertLocalDateFromServer(entity.nascimento);
    }

    private convert(usuario: Usuario): Usuario {
        const copy: Usuario = Object.assign({}, usuario);
        copy.nascimento = this.dateUtils
            .convertLocalDateToServer(usuario.nascimento);
        return copy;
    }
}

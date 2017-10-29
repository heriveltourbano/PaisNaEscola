import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AgendaService {

    private resourceUrl = 'api/agenda';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(agenda: Agenda): Observable<Agenda> {
        const copy = this.convert(agenda);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(agenda: Agenda): Observable<Agenda> {
        const copy = this.convert(agenda);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Agenda> {
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
        entity.inicio = this.dateUtils
            .convertDateTimeFromServer(entity.inicio);
        entity.termino = this.dateUtils
            .convertDateTimeFromServer(entity.termino);
    }

    private convert(agenda: Agenda): Agenda {
        const copy: Agenda = Object.assign({}, agenda);

        copy.inicio = this.dateUtils.toDate(agenda.inicio);

        copy.termino = this.dateUtils.toDate(agenda.termino);
        return copy;
    }
}

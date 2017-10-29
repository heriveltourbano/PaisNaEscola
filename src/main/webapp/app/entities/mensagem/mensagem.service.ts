import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Mensagem } from './mensagem.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MensagemService {

    private resourceUrl = 'api/mensagems';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(mensagem: Mensagem): Observable<Mensagem> {
        const copy = this.convert(mensagem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(mensagem: Mensagem): Observable<Mensagem> {
        const copy = this.convert(mensagem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Mensagem> {
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
        entity.criada = this.dateUtils
            .convertDateTimeFromServer(entity.criada);
        entity.enviada = this.dateUtils
            .convertDateTimeFromServer(entity.enviada);
        entity.recebida = this.dateUtils
            .convertDateTimeFromServer(entity.recebida);
        entity.lida = this.dateUtils
            .convertDateTimeFromServer(entity.lida);
    }

    private convert(mensagem: Mensagem): Mensagem {
        const copy: Mensagem = Object.assign({}, mensagem);

        copy.criada = this.dateUtils.toDate(mensagem.criada);

        copy.enviada = this.dateUtils.toDate(mensagem.enviada);

        copy.recebida = this.dateUtils.toDate(mensagem.recebida);

        copy.lida = this.dateUtils.toDate(mensagem.lida);
        return copy;
    }
}

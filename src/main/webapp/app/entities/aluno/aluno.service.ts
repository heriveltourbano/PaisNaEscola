import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Aluno } from './aluno.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AlunoService {

    private resourceUrl = 'api/alunos';

    constructor(private http: Http) { }

    create(aluno: Aluno): Observable<Aluno> {
        const copy = this.convert(aluno);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(aluno: Aluno): Observable<Aluno> {
        const copy = this.convert(aluno);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Aluno> {
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

    private convert(aluno: Aluno): Aluno {
        const copy: Aluno = Object.assign({}, aluno);
        return copy;
    }
}

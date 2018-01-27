import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Exam } from './exam.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExamService {

    private resourceUrl = SERVER_API_URL + 'api/exams';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(exam: Exam): Observable<Exam> {
        const copy = this.convert(exam);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(exam: Exam): Observable<Exam> {
        const copy = this.convert(exam);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Exam> {
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
        entity.created = this.dateUtils
            .convertDateTimeFromServer(entity.created);
        entity.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(entity.lastModifiedDate);
    }

    private convert(exam: Exam): Exam {
        const copy: Exam = Object.assign({}, exam);

        copy.created = this.dateUtils.toDate(exam.created);

        copy.lastModifiedDate = this.dateUtils.toDate(exam.lastModifiedDate);
        return copy;
    }
}

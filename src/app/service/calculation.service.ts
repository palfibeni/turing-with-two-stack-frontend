import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TuringMachine} from "../dto/TuringMachine";
import {Observable} from "rxjs";
import {Calculation} from "../dto/Calculation";

@Injectable({
    providedIn: 'root'
})
export class CalculationService {
    private apiURL: string = 'http://127.0.0.1:8080/api';

    // DataShare
    public turingMachine: TuringMachine = null;
    public calculation: Calculation = null;

    constructor(private httpClient: HttpClient) {
    }

    public calculate(turingMachine: TuringMachine, input: String): Observable<Calculation> {
        let body = {
            turingMachine: turingMachine,
            input: input
        };
        return this.httpClient.post<Calculation>(`${this.apiURL}/calculate`, body);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TuringMachine} from "../dto/TuringMachine";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TuringMachineService {
    private apiURL: string = 'http://127.0.0.1:8080/api';

    constructor(private httpClient: HttpClient) {}

    public getAnBnCnTuringMachine() : Observable<TuringMachine>{
        return this.httpClient.get<TuringMachine>(`${this.apiURL}/AnBnCnTuringMachine`);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TuringMachine} from "../dto/TuringMachine";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TuringRule} from "../dto/TuringRule";
import {MachineState} from "../dto/MachineState";

@Injectable({
    providedIn: 'root'
})
export class TuringMachineService {
    private apiURL: string = 'http://127.0.0.1:8080/api';

    constructor(private httpClient: HttpClient) {
    }

    public getTuringMachines(): Observable<Array<TuringMachine>> {
        return this.httpClient.get<Array<TuringMachine>>(`${this.apiURL}/turing-machines`);
    }

    public getTuringMachine(id: string): Observable<TuringMachine> {
        return this.httpClient.get<TuringMachine>(`${this.apiURL}/turing-machine/${id}`).pipe(
            map(res => {
                let rules = res.rules.map(rule => Object.assign(new TuringRule(), rule));
                let states = res.states.map(state => Object.assign(new MachineState(), state));
                return new TuringMachine(res.id, res.name, res.description, res.tapeCharacters, states, rules);
            })
        );
    }

    public saveTuringMachine(turingMachine: TuringMachine): Observable<TuringMachine> {
        return this.httpClient.post<TuringMachine>(`${this.apiURL}/turing-machine`, turingMachine);
    }

    public getAnBnCnTuringMachine(): Observable<TuringMachine> {
        return this.httpClient.get<TuringMachine>(`${this.apiURL}/an-bn-cn-turing-machine`);
    }
}

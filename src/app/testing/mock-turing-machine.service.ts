import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {TuringMachine} from "../dto/TuringMachine";

@Injectable()
export class MockTuringMachineService {

    public getTuringMachines(): Observable<Array<TuringMachine>> {
        return of([]);
    }

    public getTuringMachine(id: number): Observable<TuringMachine> {
        return of(new TuringMachine());
    }
}

import {Injectable} from "@angular/core";
import {TuringMachine} from "../dto/TuringMachine";
import {Observable, of} from "rxjs";
import {Calculation} from "../dto/Calculation";

@Injectable()
export class MockCalculationService {

    public calculation: Calculation = new Calculation();
    public turingMachine: TuringMachine = new TuringMachine();

    public calculate(turingMachine: TuringMachine, input: String): Observable<Calculation> {
        return of(this.calculation);
    }
}

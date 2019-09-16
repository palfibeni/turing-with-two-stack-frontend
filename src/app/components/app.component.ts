import { Component } from '@angular/core';
import {TuringMachineService} from "../service/turing.machine.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

    constructor(private turingMachineService: TuringMachineService) {
    }

    name = 'Angular';

    public ngOnInit() : void {
        this.turingMachineService.getAnBnCnTuringMachne().subscribe(res => {
            console.log(res);
        });
    }
}

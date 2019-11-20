import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TuringMachine} from "../../../../dto/TuringMachine";
import {ToasterService} from "angular2-toaster";
import {TuringMachineValidator} from "../../../../validator/turing-machine.validator";
import {TuringRule} from "../../../../dto/TuringRule";
import {MachineState} from "../../../../dto/MachineState";

@Component({
    selector: 'app-turing-machine-json-tab',
    templateUrl: './turing-machine-json-tab.component.html',
    styleUrls: ['./turing-machine-json-tab.component.scss']
})
export class TuringMachineJsonTabComponent implements OnInit {

    @Input('turingMachine') turingMachine: TuringMachine = new TuringMachine();

    @Output('turingMachineChange') turingMachineChange: EventEmitter<TuringMachine> = new EventEmitter();

    private jsonEdit: boolean;
    private jsonMachine: string;
    private parseError: boolean;

    constructor(private toasterService: ToasterService,
                private turingMachineValidator: TuringMachineValidator) {
    }

    public ngOnInit(): void {
    }

    private onJsonChange(event) {
        // get value from text area
        let newValue = event.target.value;
        try {
            // parse it to json
            JSON.parse(newValue);
            this.jsonMachine = newValue;
            this.parseError = false;
        } catch (ex) {
            // set parse error if it fails
            this.parseError = true;
        }
    }

    private onJsonEdit() {
        this.jsonMachine = JSON.stringify(this.turingMachine, undefined, 2);
        this.jsonEdit = true;
    }

    private onJsonCancel() {
        this.jsonMachine = JSON.stringify(this.turingMachine, undefined, 2);
        this.jsonEdit = false;
    }

    private onJsonSave() {
        console.log("Saving by JSON");
        if (this.parseError) {
            this.toasterService.pop('error', 'Not Valid JSON', 'Only Valid JSON can be saved');
            return;
        }

        try {
            let parsedTuringMachine: TuringMachine = JSON.parse(this.jsonMachine);
            let rules = parsedTuringMachine.rules.map(rule => Object.assign(new TuringRule(), rule));
            let states = parsedTuringMachine.states.map(state => Object.assign(new MachineState(), state));
            let turingMachineFromJson = new TuringMachine(parsedTuringMachine.id, parsedTuringMachine.name, parsedTuringMachine.description, parsedTuringMachine.tapeCharacters, states, rules);

            this.turingMachineValidator.validateTuringMachine(turingMachineFromJson);

            this.jsonEdit = false;
            this.turingMachine = turingMachineFromJson;
            this.turingMachineChange.emit(this.turingMachine);
        } catch (ex) {
            this.toasterService.pop('error', 'Not Valid JSON', ex);
        }
    }

}

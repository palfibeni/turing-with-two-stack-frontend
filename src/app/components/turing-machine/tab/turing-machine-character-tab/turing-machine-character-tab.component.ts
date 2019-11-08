import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";

import {TuringMachine} from "../../../../dto/TuringMachine";
import {TuringMachineValidator} from "../../../../validator/turing-machine.validator";

@Component({
    selector: 'app-turing-machine-character-tab',
    templateUrl: './turing-machine-character-tab.component.html',
    styleUrls: ['./turing-machine-character-tab.component.scss']
})
export class TuringMachineCharacterTabComponent implements OnInit {

    @Input('turingMachine') turingMachine: TuringMachine = new TuringMachine();

    @Output('turingMachineChange') turingMachineChange: EventEmitter<TuringMachine> = new EventEmitter();

    private newChar: String;
    private selectedChar: number;

    constructor(private toasterService: ToasterService, private turingMachineValidator: TuringMachineValidator) {
    }

    public ngOnInit(): void {
    }

    public addChar(): void {
        try {
            console.log(`add ${this.newChar}`);

            this.turingMachineValidator.validateCharacters(_.union(this.turingMachine.tapeCharacters, [this.newChar]));

            this.turingMachine.tapeCharacters.push(this.newChar);
            this.newChar = "";
        } catch (ex) {
            this.toasterService.pop('error', 'Invalid new character', ex);
        }
    }

    public deleteChar(): void {
        try {
            console.log(`delete char ${this.selectedChar}`);
            if (!this.selectedChar) {
                this.toasterService.pop('error', 'No selection', 'You must select a character!');
                return;
            }
            let char = this.turingMachine.tapeCharacters[this.selectedChar];
            let ruleWhereCharacterIsUsed = _.find(this.turingMachine.rules, (rule) => {
                return rule.readCharacter === char
                    || rule.writeCharacter === char;
            });
            if (ruleWhereCharacterIsUsed) {
                this.toasterService.pop(
                    'error', 'Used',
                    `The character is still in use! (char: ${char}) (ruleId; ${ruleWhereCharacterIsUsed.id})`);
                return;
            }
            this.turingMachine.tapeCharacters.splice(this.selectedChar, 1);
            this.selectedChar = null;
        } catch (ex) {
            this.toasterService.pop('error', 'Invalid new character', ex);
        }
    }

}

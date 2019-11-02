import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";

import {TuringMachine} from "../../../../dto/TuringMachine";

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

    constructor(private toasterService: ToasterService) {
    }

    public ngOnInit(): void {
    }

    public addChar(): void {
        console.log(`add ${this.newChar}`);
        if (!this.newChar || !this.newChar.length || !this.newChar.trim()) {
            this.toasterService.pop('error', 'Empty character', `Empty Character is not allowed! (${this.newChar})`);
            return;
        }
        if (_.contains(this.turingMachine.tapeCharacters, this.newChar)) {
            this.toasterService.pop('error', 'Found duplicate', `Duplicate Character is not allowed! (${this.newChar})`);
            return;
        }
        if (this.newChar === '#' || this.newChar === '*') {
            this.toasterService.pop('error', 'Reserved character', `Reserved character is not allowed! ('#', '*')`);
            return;
        }
        this.turingMachine.tapeCharacters.push(this.newChar);
        this.newChar = "";
    }

    public deleteChar(): void {
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
    }

}

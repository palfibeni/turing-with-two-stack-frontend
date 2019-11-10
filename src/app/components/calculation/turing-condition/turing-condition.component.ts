import {Component, Input, OnInit} from '@angular/core';
import {_} from 'underscore';

import {Condition} from "../../../dto/Condition";

@Component({
    selector: 'app-turing-condition',
    templateUrl: './turing-condition.component.html',
    styleUrls: ['./turing-condition.component.scss']
})
export class TuringConditionComponent implements OnInit {

    @Input('condition') public condition: Condition;

    public charactersBehind: Array<String>;
    public restCharactersBehind: Array<String>;
    public charactersAhead: Array<String>;
    public restCharactersAhead: Array<String>;

    constructor() {
    }

    ngOnInit() {
        this.charactersBehind = _.last(this.condition.charactersBehind, 4);
        this.restCharactersBehind = _.initial(this.condition.charactersBehind, 4);
        this.charactersAhead = _.first(this.condition.charactersAhead, 4);
        this.restCharactersAhead = _.rest(this.condition.charactersAhead, 4);
    }

}

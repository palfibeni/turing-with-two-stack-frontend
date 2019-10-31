import {Component, Input, OnInit} from '@angular/core';
import {_} from 'underscore';

import {Condition} from "../../../dto/Condition";

@Component({
  selector: 'app-turing-condition',
  templateUrl: './turing-condition.component.html',
  styleUrls: ['./turing-condition.component.scss']
})
export class TuringConditionComponent implements OnInit {

  @Input('condition') condition: Condition;

  private charactersBehind: Array<String>;
  private restCharactersBehind: Array<String>;
  private charactersAhead: Array<String>;
  private restCharactersAhead: Array<String>;

  constructor() { }

  ngOnInit() {
    this.charactersBehind = _.last(this.condition.charactersBehind, 3);
    this.restCharactersBehind = _.initial(this.condition.charactersBehind, 3);
    this.charactersAhead = _.first(this.condition.charactersAhead, 3);
    this.restCharactersAhead = _.rest(this.condition.charactersAhead, 3);
  }

}

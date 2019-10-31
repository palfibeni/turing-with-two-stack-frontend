import {Component, Input, OnInit} from '@angular/core';
import {_} from 'underscore';

import {Condition} from "../../../dto/Condition";

@Component({
  selector: 'app-two-stack-condition',
  templateUrl: './two-stack-condition.component.html',
  styleUrls: ['./two-stack-condition.component.scss']
})
export class TwoStackConditionComponent implements OnInit {

  @Input('condition') condition: Condition;

  private charactersBehind: Array<String>;
  private restCharactersBehind: Array<String>;
  private charactersAhead: Array<String>;
  private restCharactersAhead: Array<String>;

  constructor() { }

  ngOnInit() {
    this.charactersBehind = _.first(this.condition.charactersBehind, 3);
    this.restCharactersBehind = _.rest(this.condition.charactersBehind, 3);
    this.charactersAhead = _.first(this.condition.charactersAhead, 3);
    this.restCharactersAhead = _.rest(this.condition.charactersAhead, 3);
  }

}

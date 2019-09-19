import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: `hello.component.html`,
  styleUrls: [`hello.component.scss`]
})
export class HelloComponent  {
  @Input() name: string;
}

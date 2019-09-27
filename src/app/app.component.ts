import { Component, OnInit } from '@angular/core';
import {ToasterConfig} from "angular2-toaster";

@Component({
  selector: 'root-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public toastConfig: ToasterConfig =
      new ToasterConfig({
        timeout: 0,
        limit: 3,
        positionClass: 'toast-bottom-right'
      });
}

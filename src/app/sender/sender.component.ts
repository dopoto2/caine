import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SignalRService } from '../signal-r.service';
import { Command } from '../command.model';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.less']
})
export class SenderComponent implements OnInit {

  private readonly signalrService: SignalRService;

  constructor(signalRService: SignalRService, private _snackBar: MatSnackBar) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
  }

  send() {
    const command: Command = {
      FreqInKhz: 12000,
      DurationInSeconds: 5,
      Owner: "Doru",
      Date: new Date(Date.now()).toLocaleString()
    }
    this._snackBar.open("Command sent", "", {duration: 2000});
    this.signalrService.send(command).subscribe(() => {});
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}

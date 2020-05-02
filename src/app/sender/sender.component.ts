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

  khz: number = 22;
  seconds: number = 15;

  constructor(signalRService: SignalRService, private _snackBar: MatSnackBar) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
  }

  send() {
    const command: Command = {
      FreqInKhz: this.khz,
      DurationInSeconds: this.seconds,
      Owner: "Doru",
      Date: new Date(Date.now()).toLocaleString()
    }
    this._snackBar.open("Sending command...", "", {duration: 2000});
    this.signalrService.send(command).subscribe(() => {
      this._snackBar.open("Command sent, please wait a few seconds.", "", {duration: 2000});
    });
  }
}

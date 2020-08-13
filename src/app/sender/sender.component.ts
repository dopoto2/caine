import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignalRService } from '../signal-r.service';
import { ActivatedRoute } from '@angular/router';

import { Command } from '../command.model';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.less']
})
export class SenderComponent implements OnInit {

  private readonly signalrService: SignalRService;

  khz: number = 3;
  seconds: number = 3;

  constructor(
    signalRService: SignalRService,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute
  ) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
  }

  send() {
    const command: Command = {
      FreqInKhz: this.khz,
      DurationInSeconds: this.seconds,
      Owner: this.router.snapshot.queryParamMap.get('owner') || "Doru",
      Date: new Date(Date.now()).toLocaleString()
    };
    
    this.signalrService.send(command).subscribe(() => {
      this._snackBar.open("Command sent, please wait a few seconds.", "", { duration: 2000 });
    });
  }
}

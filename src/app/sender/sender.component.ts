import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';
import { Command } from '../command.model';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.less']
})
export class SenderComponent implements OnInit {

  private readonly signalrService: SignalRService;

  constructor(signalRService: SignalRService) {
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
    this.signalrService.send(command).subscribe(() => {});
  }
}

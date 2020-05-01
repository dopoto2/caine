import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';
import { Command } from '../command.model';
import { getLocaleDateTimeFormat } from '@angular/common';

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
      DurationInSeconds: 2,
      Owner: "Doru",
      Date: Date.now().toString()
    }
    this.signalrService.send(command).subscribe(() => {});
  }
}

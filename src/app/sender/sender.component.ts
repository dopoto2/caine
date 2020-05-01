import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';

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
    this.signalrService.send().subscribe(() => {});
  }
}

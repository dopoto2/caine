import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignalRService } from '../signal-r.service';
import { Command } from '../command.model';

declare function playTone(
  frequency: number,
  type: 'sine' | 'square' | 'triangle' | 'sawtooth',
  durationInSeconds: number): any;

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.less']
})
export class WatcherComponent implements OnInit {

  private readonly signalrService: SignalRService;
  public currentState: "INI" | "IDLE" | "STARTED" = "INI";

  constructor(signalRService: SignalRService) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
    this.signalrService.hubConnection.on('commandSent', (data: Command) => {
      this.currentState = data.DurationInSeconds > 0 ? "STARTED" : "IDLE";
      playTone(data.FreqInKhz, 'sine', data.DurationInSeconds);
      console.log(JSON.stringify(data));
    });
  }
}

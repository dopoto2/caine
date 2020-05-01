import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignalRService } from '../signal-r.service';

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

  constructor(signalRService: SignalRService, private cdr: ChangeDetectorRef) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
    this.signalrService.hubConnection.on('commandSent', (data: { State: boolean }) => {
      this.currentState = data.State ? "STARTED" : "IDLE";
      if (data.State === true) {
        playTone(12000, 'sine', 99999.00);
      }
      else {
        playTone(0, 'sine', 3.0);
      }
      console.log(JSON.stringify(data));
    });
  }

  watch(data: { State: boolean }) {

    this.currentState = data.State ? "STARTED" : "IDLE";

    // if(data.State === true){
    //   playTone(12000, 'sine', 3.0);
    // }
    // else
    // {
    //   playTone(0, 'sine', 3.0);
    // }

    this.cdr.detectChanges();
  }
}

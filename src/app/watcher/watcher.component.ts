import { Component, OnInit } from '@angular/core';

declare function playTone(frequency, type: "sine" | "square" | "triangle" | "sawtooth" , durationInSeconds): any;  
//(frequency, type, durationInSeconds)
// Sine
// Square
// Triangle
// Sawtooth

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.less']
})
export class WatcherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  play(){
    playTone(12000, "sine", 3.0);
  }
}

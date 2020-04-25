import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
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

  message: string;
  messages = '';

  constructor(signalRService: SignalRService) {
    this.signalrService = signalRService;
  }

  ngOnInit() {
    this.signalrService.init();
    this.signalrService.messages.subscribe(message => {
      this.messages += message;
    });
  }

  send() {
    this.signalrService.send(this.message).subscribe(() => {});
  }

  updateMessage(val){
    this.message = val;
  }

  play(){
    playTone(12000, 'sine', 3.0);
  }
}

import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';
import { ActivatedRoute } from '@angular/router';

import { Command } from '../command.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-watcher',
	templateUrl: './watcher.component.html',
	styleUrls: ['./watcher.component.less']
})
export class WatcherComponent implements OnInit {

	private readonly signalrService: SignalRService;
	public currentState: "IDLE" | "STARTED" = "IDLE";
	public currentCommand: Command = {
		Date: "1/1/2000 13:56 PM",
		DurationInSeconds: 12,
		FreqInKhz:23,
		Owner: "Doru"
	};
	isInPlayMode = false;
	playMode$: Subscription;

	constructor(signalRService: SignalRService, private route: ActivatedRoute) {
		this.signalrService = signalRService;
	}

	ngOnInit() {
		this.playMode$ = this.route.paramMap.subscribe((params) => {
			this.isInPlayMode = params.get("play") === "true" ? true : false;
		  });

		this.signalrService.init();
		this.signalrService.hubConnection.on('commandSent', (data: Command) => {
			this.currentState = data.DurationInSeconds > 0 ? "STARTED" : "IDLE";
			this.currentCommand = data;

			if(this.isInPlayMode){
				this.playBeep(data.FreqInKhz, data.DurationInSeconds);
			}

			console.log("Received:" + JSON.stringify(data));

			setTimeout(() => {
				this.currentState = "IDLE";
			}, data.DurationInSeconds * 1000);
		});
	}

	playBeep(freqInKhz: number, durationInSeconds: number) {
		var audioCtx = new((<any>window).AudioContext || (<any>window).webkitAudioContext)();

		var oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();
	  
		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);
	  
		gainNode.gain.value = 1;
		oscillator.frequency.value = freqInKhz * 1000;
		oscillator.type = 'square';
	  
		oscillator.start();
	  
		setTimeout(
		  () => {
			oscillator.stop();
			console.log("Stopped " + freqInKhz + " khz / " + durationInSeconds + " seconds.");
		  },
		  durationInSeconds * 1000
		);
	  };

	  ngOnDestroy() {
		this.playMode$.unsubscribe();
	  }
}

import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';
import { ActivatedRoute } from '@angular/router';

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
	public currentState: "IDLE" | "STARTED" = "IDLE";
	public currentCommand: Command = {
		Date: "1/1/2000 13:56 PM",
		DurationInSeconds: 12,
		FreqInKhz:23,
		Owner: "Doru"
	};
	private isInPlayMode = false;

	constructor(signalRService: SignalRService, private router: ActivatedRoute) {
		this.signalrService = signalRService;
	}

	ngOnInit() {
		this.isInPlayMode = this.router.snapshot.queryParamMap.get('play') === 'true';

		this.signalrService.init();
		this.signalrService.hubConnection.on('commandSent', (data: Command) => {
			this.currentState = data.DurationInSeconds > 0 ? "STARTED" : "IDLE";
			this.currentCommand = data;

			if(this.isInPlayMode){
				playTone(data.FreqInKhz * 1000, 'sine', data.DurationInSeconds);
			}

			console.log("Received:" + JSON.stringify(data));

			setTimeout(() => {
				this.currentState = "IDLE";
			}, data.DurationInSeconds * 1000);
		});
	}
}

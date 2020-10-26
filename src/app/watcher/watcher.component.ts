import { Component, OnInit } from "@angular/core";
import { CommandService } from "../command.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CurrentStateType } from "../current-state-type.model";
import { Command } from "../command.model";

@Component({
    selector: "app-watcher",
    templateUrl: "./watcher.component.html",
    styleUrls: ["./watcher.component.less"],
})
export class WatcherComponent implements OnInit {
    private readonly commandService: CommandService;

    isInPlayMode = false;
    playModeSubscription: Subscription;
    commandsSubscription: Subscription;
    currentStateSubscription: Subscription;

    currentCommand: Command;
    currentState: CurrentStateType;

    oscillator: any;

    /**
     * Just so we can use this enum in the HTML template.
     */
    currentStateEnum = CurrentStateType;

    constructor(commandService: CommandService, private route: ActivatedRoute) {
        this.commandService = commandService;
    }

    ngOnInit() {
        this.playModeSubscription = this.route.paramMap.subscribe((params) => {
            this.isInPlayMode = params.get("play") === "true" ? true : false;
        });

        this.commandService.currentCommand$.subscribe((command) => {
            this.currentCommand = command;
            if (this.isInPlayMode) {
                command.DurationInSeconds > 0
                    ? this.playBeep(
                          command.FreqInKhz,
                          command.DurationInSeconds
                      )
                    : this.stop();
            }
        });

        this.commandService.currentState$.subscribe((currentState) => {
            this.currentState = currentState;
        });
    }

    playBeep(freqInKhz: number, durationInSeconds: number) {
        var audioCtx = new ((<any>window).AudioContext ||
            (<any>window).webkitAudioContext)();

        this.oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        this.oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.value = 1;
        this.oscillator.frequency.value = freqInKhz * 1000;
        this.oscillator.type = "square";

        this.oscillator.start();

        setTimeout(() => {
            this.oscillator.stop();
            console.log(
                "Stopped " +
                    freqInKhz +
                    " khz / " +
                    durationInSeconds +
                    " seconds."
            );
        }, durationInSeconds * 1000);
    }

    stop(): void {
        this.oscillator.stop();
    }

    ngOnDestroy() {
        if (this.playModeSubscription) {
            this.playModeSubscription.unsubscribe();
        }

        if (this.commandsSubscription) {
            this.commandsSubscription.unsubscribe();
        }
    }
}

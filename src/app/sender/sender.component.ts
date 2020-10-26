import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommandService } from "../command.service";
import { ActivatedRoute } from "@angular/router";

import { Command } from "../command.model";
import { Subscription } from 'rxjs';
import { CurrentStateType } from '../current-state-type.model';

@Component({
    selector: "app-sender",
    templateUrl: "./sender.component.html",
    styleUrls: ["./sender.component.less"],
})
export class SenderComponent implements OnInit {
    private readonly commandService: CommandService;
    private stateSubscription: Subscription;

    currentStateEnum = CurrentStateType;
    currentState: CurrentStateType;

    khz: number = 3;
    seconds: number = 3;

    constructor(
        commandService: CommandService,
        private snackBar: MatSnackBar,
        private router: ActivatedRoute
    ) {
        this.commandService = commandService;
    }

    ngOnInit() {
        this.commandService.init();

        this.stateSubscription = this.commandService.currentState$.subscribe(state => {
            this.currentState = state;
        });
    }

    play() {
        const command: Command = {
            FreqInKhz: this.khz,
            DurationInSeconds: this.seconds,
            Owner: this.router.snapshot.queryParamMap.get("owner") || "Doru",
            Date: new Date(Date.now()).toLocaleString(),
        };
        this.commandService.addCommand(command);
        this.snackBar.open("Command sent, please wait a few seconds.", "", {
            duration: 2000,
        });
    }

    stop() {
        const command: Command = {
            FreqInKhz: 0,
            DurationInSeconds: 0,
            Owner: this.router.snapshot.queryParamMap.get("owner") || "Doru",
            Date: new Date(Date.now()).toLocaleString(),
        };
        this.commandService.addCommand(command);
    }

    ngOnDestroy(){
        if(this.stateSubscription){
            this.stateSubscription.unsubscribe();
        }
    }
}

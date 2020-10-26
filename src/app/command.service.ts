import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

import { Command } from "./command.model";
import { CurrentStateType } from "./current-state-type.model";

@Injectable({
    providedIn: "root",
})
export class CommandService {
    public commands: Command[] = [];
    public currentCommand$: Subject<Command>;
    public currentState$: BehaviorSubject<CurrentStateType>;

    private readonly http: HttpClient;
    private readonly baseUrl: string =
        "https://cainefunctionapp20200424215716.azurewebsites.net/api/";
    //private readonly baseUrl: string = 'http://localhost:7071/api/';
    public hubConnection: HubConnection;

    isReady = false;

    constructor(http: HttpClient) {
        this.http = http;
        this.currentCommand$ = new Subject();
        this.currentState$ = new BehaviorSubject(CurrentStateType.Idle);
    }

    init() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();
        this.hubConnection.onclose(() => console.log("disconnected"));

        console.log("connecting...");
        this.hubConnection
            .start()
            .then(() => (this.isReady = true))
            .catch(console.error);

        this.hubConnection.on("commandSent", (remoteCommand: Command) => {
            this.addCommand(remoteCommand);
        });
    }

    /**
     *
     * @param command
     */
    addCommand(command: Command): void {
        // Reject command if already added (local commands are received again through SignalR)
        if (this.commands.find((c) => c.Date === command.Date)) {
            return;
        }

        this.commands.push(command);
        this.sendCommandToRemoteClients(command);
        this.currentCommand$.next(command);
        
        if(command.DurationInSeconds > 0){
            this.currentState$.next(CurrentStateType.InProgress);
        }

        setTimeout(() => {
            this.currentState$.next(CurrentStateType.Idle);
        }, command.DurationInSeconds * 1000);

        // Keep a local history of 3 commands
        this.commands.splice(0, this.commands.length - 3);
    }

    sendCommandToRemoteClients(command: Command): void {
        const requestUrl = `${this.baseUrl}SendCommand`;
        this.http.post(requestUrl, command).pipe(map(() => {}));
    }

    attachWatcher(fn: any) {
        this.hubConnection.on("commandSent", fn);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Command } from './command.model';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {

    private readonly http: HttpClient;
    private readonly baseUrl: string = 'https://cainefunctionapp20200424215716.azurewebsites.net/api/';
    //private readonly baseUrl: string = 'http://localhost:7071/api/';
    public hubConnection: HubConnection;

    isReady = false;

    currentCommand: Command = {
        FreqInKhz: 0,
        DurationInSeconds: 0,
        Owner: "",
        Date: ""
    };

    messages: Subject<string> = new Subject();

    constructor(http: HttpClient) {
        this.http = http;
    }

    init() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();
        this.hubConnection.onclose(() => console.log('disconnected'));

        console.log('connecting...');
        this.hubConnection.start()
            .then(() => this.isReady = true)
            .catch(console.error);
    }

    send(command: Command): Observable<void> {        
        const requestUrl = `${this.baseUrl}SendCommand`;
        console.log("Sending [" + JSON.stringify(command) + "]...");
        return this.http.post(requestUrl, command).pipe(map((result: any) => { }));
    }

    attachWatcher(fn: any) {
        this.hubConnection.on('commandSent', fn);
    }
}

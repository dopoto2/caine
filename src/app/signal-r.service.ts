import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SignalRConnectionInfo } from './signal-r-connection-info.model';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {

    private readonly http: HttpClient;
    private readonly baseUrl: string = 'https://cainefunctionapp20200424215716.azurewebsites.net:7071/api/'; //'http://localhost:7071/api/';
    //private readonly baseUrl: string = 'http://localhost:7071/api/';
    public hubConnection: HubConnection;

    data = {
        currentState: false,
        ready: false
    };

    messages: Subject<string> = new Subject();

    constructor(http: HttpClient) {
        this.http = http;
    }

    init() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:7071/api')
            .configureLogging(signalR.LogLevel.Information)
            .build();
        this.hubConnection.onclose(() => console.log('disconnected'));

        console.log('connecting...');
        this.hubConnection.start()
            .then(() => this.data.ready = true)
            .catch(console.error);
    }

    send(): Observable<void> {
        this.data.currentState = !this.data.currentState;
        const stateToSend = { State: this.data.currentState };
        const requestUrl = `${this.baseUrl}SendCommand`;
        console.log("Sending " + this.data.currentState + "...");
        return this.http.post(requestUrl, stateToSend).pipe(map((result: any) => { }));
    }

    attachWatcher(fn: any) {
        this.hubConnection.on('commandSent', fn);
    }
}

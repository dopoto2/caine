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
    private hubConnection: HubConnection;
    messages: Subject<string> = new Subject();

    constructor(http: HttpClient) {
        this.http = http;
    }

    private getConnectionInfo(): Observable<SignalRConnectionInfo> {
        const requestUrl = `${this.baseUrl}negotiate`;
        return this.http.get<SignalRConnectionInfo>(requestUrl);
    }

    init() {
        this.getConnectionInfo().subscribe(info => {
            const options = {
                accessTokenFactory: () => info.accessKey
            };

            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(info.endpoint, options)
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.hubConnection.start().catch(err => console.error(err.toString()));

            this.hubConnection.on('notify', (data: any) => {
                this.messages.next(data);
            });
        });
    }

    send(message: string): Observable<void> {
        const requestUrl = `${this.baseUrl}message`;
        return this.http.post(requestUrl, message).pipe(map((result: any) => { }));
    }
}

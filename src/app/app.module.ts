import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatCardModule} from '@angular/material/card';
import { NgxSwitchInputModule } from "@ngx-tiny/switch-input";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WatcherComponent } from "./components/watcher/watcher.component";
import { SenderComponent } from "./components/sender/sender.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { CommandService } from "./services/command/command.service";
import { OptionsComponent } from './components/options/options.component';

@NgModule({
    declarations: [
        AppComponent,
        WatcherComponent,
        SenderComponent,
        HomeComponent,
        HeaderComponent,
        OptionsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSliderModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatCardModule,
        NgxSwitchInputModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    /**
     *
     */
    constructor(commandService: CommandService) {
        commandService.init();
    }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxSwitchInputModule } from "@ngx-tiny/switch-input";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WatcherComponent } from "./watcher/watcher.component";
import { SenderComponent } from "./sender/sender.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { CommandService } from "./services/command/command.service";

@NgModule({
    declarations: [
        AppComponent,
        WatcherComponent,
        SenderComponent,
        HomeComponent,
        HeaderComponent,
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
        NgxSwitchInputModule,
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

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Mode } from "../../models/mode.model";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
    mode: Mode;
    modeEnum = Mode;
    modeSubscription: Subscription;

    showSender = true;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.modeSubscription = this.route.paramMap.subscribe((params) => {
            this.mode = (params.get("mode") as Mode) ?? Mode.ControlAndPlay;
            switch (this.mode) {
                case Mode.ControlAndPlay: {
                    this.showSender = true;
                    break;
                }
                case Mode.ControlOnly: {
                    this.showSender = true;
                    break;
                }
                case Mode.PlayOnly: {
                    this.showSender = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.modeSubscription) {
            this.modeSubscription.unsubscribe();
        }
    }
}

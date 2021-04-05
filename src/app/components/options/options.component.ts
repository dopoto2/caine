import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Mode } from "../../models/mode.model";

@Component({
    selector: "app-options",
    templateUrl: "./options.component.html",
    styleUrls: ["./options.component.less"],
})
export class OptionsComponent implements OnInit {
    mode: Mode;
    modeEnum = Mode;
    modeSubscription: Subscription;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.modeSubscription = this.route.paramMap.subscribe((params) => {
            this.mode = (params.get("mode") as Mode) ?? Mode.ControlOnly;
        });
    }

    onModeChange($event) {
        this.router.navigate(["/home", { mode: $event.value }]);
    }

    ngOnDestroy() {
        if (this.modeSubscription) {
            this.modeSubscription.unsubscribe();
        }
    }
}

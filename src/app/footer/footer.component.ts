import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"],
})
export class FooterComponent implements OnInit {
  isInPlayMode = false;
  playMode$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.playMode$ = this.route.paramMap.subscribe((params) => {
      this.isInPlayMode = params.get("play") === "true" ? true : false;
      console.log("rt" + this.route.snapshot.queryParamMap.get("play"));
    });
  }

  ngOnDestroy() {
    this.playMode$.unsubscribe();
  }
}

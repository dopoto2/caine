import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isInPlayMode = true;
  playMode$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.playMode$ = this.route.paramMap.subscribe((params) => {
      this.isInPlayMode = params.get("play") === "true" ? true : false;
    });
  }

  onToggle($event){
    this.router.navigate(['/home', { play: $event }]);
  }

  ngOnDestroy() {
    this.playMode$.unsubscribe();
  }
}

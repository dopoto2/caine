import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatcherComponent } from './watcher/watcher.component';

const routes: Routes = [
  { path: 'watcher', component: WatcherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

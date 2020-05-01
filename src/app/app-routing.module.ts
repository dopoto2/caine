import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatcherComponent } from './watcher/watcher.component';
import { SenderComponent } from './sender/sender.component';

const routes: Routes = [
  { path: 'send', component: SenderComponent },
  { path: 'watch', component: WatcherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

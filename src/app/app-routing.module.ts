import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatcherComponent } from './watcher/watcher.component';
import { SenderComponent } from './sender/sender.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'send', component: SenderComponent },
  { path: 'watch', component: WatcherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

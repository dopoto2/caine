import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatcherComponent } from './components/watcher/watcher.component';
import { SenderComponent } from './components/sender/sender.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'send', component: SenderComponent },
  { path: 'watch', component: WatcherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

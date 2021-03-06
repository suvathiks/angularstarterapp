import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./components/home/home.component";
import { HomeRoutingModule } from "./home.routing";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: []
})
export class HomeModule {}

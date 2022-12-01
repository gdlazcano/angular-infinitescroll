import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { AddEntryComponent } from "./add-entry/add-entry.component";
import { HttpClientModule } from "@angular/common/http";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CardComponent, AddEntryComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

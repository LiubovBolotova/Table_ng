import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { TableComponent } from './table/table.component';
import { TableServiceService } from './table-service.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [TableServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

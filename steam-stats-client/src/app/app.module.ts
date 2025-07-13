import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component/app.component';
import { UserSearchComponent } from './components/user-search.component/user-search.component';
import { StatsChartComponent } from './components/stats-chart.component/stats-chart.component';
import { CompareViewComponent } from './components/compare-view.component/compare-view.component';

@NgModule({
  declarations: [

  ],
  imports: [
    AppComponent,
    UserSearchComponent,
    StatsChartComponent,
    CompareViewComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

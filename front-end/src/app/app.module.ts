import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonComponent} from "../components/button/button.component";
import {QuestionComponent} from "../components/question/question.component";
import {QuizComponent} from "../components/quiz/quiz.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    QuestionComponent,
    QuizComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

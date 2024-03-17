import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from "../components/button/button.component";
import { QuestionComponent } from "../components/question/question.component";
import { QuizComponent } from "../components/quiz/quiz.component";
import { quizResultPageComponent } from 'src/components/quizResultPage/quizResultPage.component';
import { quizResultBoxComponent } from 'src/components/quizResultBox/quizResultBox.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    QuestionComponent,
    QuizComponent,
    quizResultPageComponent,
    quizResultBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

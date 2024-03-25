import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from "../components/button/button.component";
import { QuestionComponent } from "../components/question/question.component";
import { QuizComponent } from "../components/quiz/quiz.component";
import { TagsSelectorComponent } from "../components/tags-selector/tags-selector.component";
import { SearchQuizSelectorComponent } from "../components/search-quiz-selector/search-quiz-selector.component";
import { QuizSelectorItemComponent } from "../components/quiz-selector-item/quiz-selector-item.component";
import { QuizSelectorContainerComponent } from "../components/quiz-selector-container/quiz-selector-container.component";
import { QuizSelectorComponent } from "../components/quiz-selector/quiz-selector.component";
import { MemoryContainerComponent } from '../components/memory-container/memory-container.component';
import { MemoryItemComponent } from "../components/memory-item/memory-item.component";

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
    TagsSelectorComponent,
    SearchQuizSelectorComponent,
    QuizSelectorItemComponent,
    QuizSelectorContainerComponent,
    QuizSelectorComponent,
    MemoryContainerComponent,
    MemoryItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

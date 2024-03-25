import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from "../components/question/question.component";
import { QuizComponent } from "../components/quiz/quiz.component";
import { quizResultPageComponent } from 'src/components/quizResultPage/quizResultPage.component';
import { quizResultBoxComponent } from 'src/components/quizResultBox/quizResultBox.component';
import { TagsSelectorComponent } from "../components/tags-selector/tags-selector.component";
import { SearchQuizSelectorComponent } from "../components/search-quiz-selector/search-quiz-selector.component";
import { QuizSelectorItemComponent } from "../components/quiz-selector-item/quiz-selector-item.component";
import { QuizSelectorContainerComponent } from "../components/quiz-selector-container/quiz-selector-container.component";
import { QuizSelectorComponent } from "../components/quiz-selector/quiz-selector.component";
import { UserCreatorComponent } from 'src/components/userManager/userCreator.component';
import { HowToPlayQuestionComponent } from 'src/components/howToPlayQuestion/howToPlayQuestion.component';
import { ZoomSliderComponent } from 'src/components/zoomSlider/zoomSlider.component';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {RouterModule, Routes} from "@angular/router";
import {FelicidadComponent} from "../components/felicidad/felicidad.component";
import {SimonGameComponent} from "../components/simon-game/simon-game.component";

const routes: Routes = [
  { path: '', component: QuizSelectorComponent , data:{title: 'Sélection du quiz'}},
  { path: 'quizSelector', component: QuizSelectorComponent, data:{title: 'Sélection du quiz'}},
  { path: 'quiz', component: QuizComponent,data:{ title: 'Quiz'}},
  { path: 'felicitations', component: FelicidadComponent,data:{ title: 'Félicitations'}},
  { path: 'quizResultPage/:id', component: quizResultPageComponent,data:{ title: 'Résultat du quiz'}},
  { path: 'simon/:numberOfRound', component: SimonGameComponent, datat: { title: 'Simon' }}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionComponent,
    QuizComponent,
    quizResultPageComponent,
    quizResultBoxComponent,
    TagsSelectorComponent,
    SearchQuizSelectorComponent,
    QuizSelectorItemComponent,
    QuizSelectorContainerComponent,
    UserCreatorComponent,
    QuizSelectorComponent,
    NavbarComponent,
    HowToPlayQuestionComponent,
    ZoomSliderComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';

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
import { MemoryContainerComponent } from '../components/memory-container/memory-container.component';
import { MemoryItemComponent } from "../components/memory-item/memory-item.component";
import { UserCreatorComponent } from 'src/components/userManager/userCreator.component';
import { HowToPlayQuestionComponent } from 'src/components/howToPlayQuestion/howToPlayQuestion.component';
import { ZoomSliderComponent } from 'src/components/zoomSlider/zoomSlider.component';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RouterModule, Routes } from "@angular/router";
import { FelicidadComponent } from "../components/felicidad/felicidad.component";
import { GraphicPageComponent } from "../components/graphic-page/graphic-page.component"
import { StatMemoyPageComponent } from "../components/stat-memoy-page/stat-memoy-page.component";
import { StatSimonPageComponent } from "../components/stat-simon-page/stat-simon-page.component";
import { StatQuestionPageComponent } from "../components/stat-question-page/stat-question-page.component";
import { GraphicComponent } from "../components/graphic/graphic.component";
import { SimonGameComponent } from "../components/simon-game/simon-game.component";
import { SelectUserContainerComponent } from '../components/select-user-container/select-user-container.component';
import { SelectUserItemComponent } from '../components/select-user-item/select-user-item.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "../components/login/login.component";
import { AdminComponent } from "../components/admin-component/admin-component.component";
import { QuizManagerComponent } from "../components/quiz-manager/quiz-manager.component";
import { UserModifierComponent } from 'src/components/modifUser/userModifier.component';
import { SelectUserContainerForModificationComponent } from 'src/components/select-user-container-for-modification/select-user-container-for-modification.component';

const routes: Routes = [
  { path: '', component: SelectUserContainerComponent, data: { title: 'Sélection utilisateur' } },
  { path: 'quizSelector', component: QuizSelectorComponent, data: { title: 'Sélection du quiz' } },
  { path: 'quiz', component: QuizComponent, data: { title: 'Quiz' } },
  { path: 'felicitations', component: FelicidadComponent, data: { title: 'Félicitations' } },
  { path: 'quizResultPage/:id', component: quizResultPageComponent, data: { title: 'Résultat du quiz' } },
  { path: 'howToPlayQuestion', component: HowToPlayQuestionComponent, data: { title: 'Comment jouer' } },
  { path: 'simon', component: SimonGameComponent, data: { title: 'Simon' } },
  { path: 'memory', component: MemoryContainerComponent, data: { title: 'Memory' } },
  { path: 'users', component: SelectUserContainerComponent, data: { title: 'Sélection utilisateur' } },
  { path: 'selectQuiz', component: QuizSelectorComponent, data: { title: 'Sélection du quiz' } },
  { path: 'createUser', component: UserCreatorComponent, data: { title: "Création d'un utilisateur" } },
  { path: 'graphics/:id', component: GraphicPageComponent, data: { title: "Graphiques" } },
  { path: 'simonStat/:id', component: StatSimonPageComponent, data: { title: "Stats Simon" } },
  { path: 'questionStat/:id', component: StatQuestionPageComponent, data: { title: "Stats Questions" } },
  { path: 'memoryStat/:id', component: StatMemoyPageComponent, data: { title: "Stats Memory" } },
  { path: 'login', component: LoginComponent, data: { title: "Login" } },
  { path: 'admin', component: AdminComponent, data: { title: "Admin" } },
  { path: 'quizManager', component: QuizManagerComponent, data: { title: 'Gestion des quiz' } },
  { path: 'modifyUser', component: UserModifierComponent, data: { title: 'Modifier un utilisateur' } },
  { path: 'selectUserToModify', component: SelectUserContainerForModificationComponent, data: { title: "Sélection d'un utilisateur à modifier" } },
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
    QuizSelectorComponent,
    MemoryContainerComponent,
    MemoryItemComponent,
    UserCreatorComponent,
    QuizSelectorComponent,
    NavbarComponent,
    GraphicPageComponent,
    StatMemoyPageComponent,
    StatSimonPageComponent,
    StatQuestionPageComponent,
    HighchartsChartModule,
    GraphicComponent,
    HowToPlayQuestionComponent,
    ZoomSliderComponent,
    SelectUserContainerComponent,
    SelectUserItemComponent,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

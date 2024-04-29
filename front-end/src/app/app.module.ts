import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HighchartsChartModule} from 'highcharts-angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionComponent} from "../components/question/question.component";
import {QuizComponent} from "../components/quiz/quiz.component";
import {quizResultPageComponent} from 'src/components/quizResultPage/quizResultPage.component';
import {quizResultBoxComponent} from 'src/components/quizResultBox/quizResultBox.component';
import {SearchQuizSelectorComponent} from "../components/search-quiz-selector/search-quiz-selector.component";
import {QuizSelectorItemComponent} from "../components/quiz-selector-item/quiz-selector-item.component";
import {QuizSelectorContainerComponent} from "../components/quiz-selector-container/quiz-selector-container.component";
import {QuizSelectorComponent} from "../components/quiz-selector/quiz-selector.component";
import {MemoryContainerComponent} from '../components/memory-container/memory-container.component';
import {MemoryItemComponent} from "../components/memory-item/memory-item.component";
import {UserCreatorComponent} from 'src/components/userManager/userCreator.component';
import {HowToPlayQuestionComponent} from 'src/components/howToPlayQuestion/howToPlayQuestion.component';
import {ZoomSliderComponent} from 'src/components/zoomSlider/zoomSlider.component';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {RouterModule, Routes} from "@angular/router";
import {GraphicPageComponent} from "../components/graphic-page/graphic-page.component"
import {StatMemoyPageComponent} from "../components/stat-memoy-page/stat-memoy-page.component";
import {StatSimonPageComponent} from "../components/stat-simon-page/stat-simon-page.component";
import {StatQuestionPageComponent} from "../components/stat-question-page/stat-question-page.component";
import {GraphicComponent} from "../components/graphic/graphic.component";
import {SelectUserContainerComponent} from '../components/select-user-container/select-user-container.component';
import {SelectUserItemComponent} from '../components/select-user-item/select-user-item.component';
import {HttpClientModule} from "@angular/common/http";
import {SelectStatComponent} from "../components/select-stat/select-stat.component";

const routes: Routes = [];

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
    SelectStatComponent,
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
export class AppModule {
}

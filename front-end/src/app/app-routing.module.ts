import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectUserContainerComponent} from "../components/select-user-container/select-user-container.component";
import {QuizSelectorComponent} from "../components/quiz-selector/quiz-selector.component";
import {QuizComponent} from "../components/quiz/quiz.component";
import {FelicidadComponent} from "../components/felicidad/felicidad.component";
import {HowToPlayQuestionComponent} from "../components/howToPlayQuestion/howToPlayQuestion.component";
import {SimonGameComponent} from "../components/simon-game/simon-game.component";
import {MemoryContainerComponent} from "../components/memory-container/memory-container.component";
import {LoginComponent} from "../components/login/login.component";
import {AdminComponent} from "../components/admin-component/admin-component.component";
import {AuthGuard} from "../services/AuthGuard";
import {UserCreatorComponent} from "../components/userManager/userCreator.component";
import {QuizManagerComponent} from "../components/quiz-manager/quiz-manager.component";
import {UserModifierComponent} from "../components/modifUser/userModifier.component";
import {
  SelectUserContainerForModificationComponent
} from "../components/select-user-container-for-modification/select-user-container-for-modification.component";
import {SelectQuestionComponent} from "../components/select-question/select-question.component";
import {SelectQuestionCreateComponent} from "../components/select-question-create/select-question-create.component";
import {SelectUserStatComponent} from "../components/select-user-stat/select-user-stat.component";
import {GraphicPageComponent} from "../components/graphic-page/graphic-page.component";
import {StatSimonPageComponent} from "../components/stat-simon-page/stat-simon-page.component";
import {StatQuestionPageComponent} from "../components/stat-question-page/stat-question-page.component";
import {StatMemoyPageComponent} from "../components/stat-memoy-page/stat-memoy-page.component";
import {quizResultPageComponent} from "../components/quizResultPage/quizResultPage.component";

const routes: Routes = [
  { path: '', component: SelectUserContainerComponent, data: { title: 'Sélection utilisateur' } },
  { path: 'quizSelector', component: QuizSelectorComponent, data: { title: 'Sélection du quiz' } },
  { path: 'quiz', component: QuizComponent, data: { title: 'Quiz' } },
  { path: 'felicitations', component: FelicidadComponent, data: { title: 'Félicitations' } },
  { path: 'howToPlayQuestion', component: HowToPlayQuestionComponent, data: { title: 'Comment jouer' } },
  { path: 'simon', component: SimonGameComponent, data: { title: 'Simon' } },
  { path: 'memory', component: MemoryContainerComponent, data: { title: 'Memory' } },
  { path: 'users', component: SelectUserContainerComponent, data: { title: 'Sélection utilisateur' } },
  { path: 'selectQuiz', component: QuizSelectorComponent, data: { title: 'Sélection du quiz' } },
  { path: 'login', component: LoginComponent, data: { title: "Login" } },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'gestion', component: AdminComponent, data: { title: "Page de gestion" } },
      { path: 'createUser', component: UserCreatorComponent, data: { title: "Création d'un utilisateur" } },
      { path: 'quizManager', component: QuizManagerComponent, data: { title: 'Gestion des quiz' } },
      { path: 'modifyUser', component: UserModifierComponent, data: { title: 'Modifier un utilisateur' } },
      { path: 'selectUserToModify', component: SelectUserContainerForModificationComponent, data: { title: "Sélection d'un utilisateur à modifier" } },
      { path: 'selectQuestion', component: SelectQuestionComponent, data: {title: "Gestionnaire des questions"}},
      { path: 'createQuestion', component: SelectQuestionCreateComponent, data: {title: "Création/modification de question"}},
    ],
    data: { title: 'Admin' }
  },
  {
    path: 'stats',
    children: [
      { path: 'selectUserStat', component: SelectUserStatComponent, data: {title: "Sélection de l'utilisateur pour afficher les statistiques"}},
      { path: 'graphics/:id', component: GraphicPageComponent, data: { title: "Graphiques" } },
      { path: 'simonStat/:id', component: StatSimonPageComponent, data: { title: "Stats Simon" } },
      { path: 'questionStat/:id', component: StatQuestionPageComponent, data: { title: "Stats Questions" } },
      { path: 'memoryStat/:id', component: StatMemoyPageComponent, data: { title: "Stats Memory" } },
      { path: 'quizResultPage/:id', component: quizResultPageComponent, data: { title: 'Résultat du quiz' } },
    ],
    canActivate: [AuthGuard],
    data: { title: 'Statistiques' },
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

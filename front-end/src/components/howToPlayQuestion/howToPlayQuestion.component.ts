import { Component } from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { TipsComponent } from '../tips/tips.component';
import { ButtonComponent } from '../quizButton/button.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-howToPlayQuestion',
  standalone: true,
  imports: [
    QuestionComponent,
    NavbarComponent,
    TipsComponent,
    ButtonComponent,
    GenericButtonComponent
  ],
  templateUrl: './howToPlayQuestion.component.html',
  styleUrl: './howToPlayQuestion.component.scss'
})
export class HowToPlayQuestionComponent {
  tutorialPhrase: string = "";
  buttonColors: { correct: boolean, wrong: boolean }[] = [
    { correct: false, wrong: false },  // Personne1
    { correct: false, wrong: false },  // Personne2
    { correct: false, wrong: false },  // Personne3
    { correct: false, wrong: false }   // Personne4
  ];


  constructor(private router: Router) {
    this.tutorialPhrase = "Bienvenue dans ce tutoriel, pour commencer cliquez avec le clic gauche de la souris sur le bouton Personne3 qui est une des propositions de réponses à la question.";
  }

  handleButtonClick(personne: number) {
    switch (personne) {
      case 1:
      case 3:
        this.buttonColors[personne - 1] = { correct: false, wrong: true };
        this.tutorialPhrase = "Nous avons cliqué sur une réponse qui n'est pas juste, comme vous pouvez le voir, le bouton est devenu gris et n'est plus cliquable. Mais ne vous inquitez pas, la question n'est pas terminé. Essayez maintenant de cliquer sur Personne4";
        break;
      case 4:
        this.buttonColors[personne - 1] = { correct: false, wrong: true };
        this.tutorialPhrase = "Nous avons cliqué sur une réponse qui n'est pas juste. Mais ne vous inquitez pas, nous allons essayer de trouver la bonne réponse avec des indices. Cliquez sur le bouton 'Indices'";
        break;
      case 2:
        this.buttonColors[personne - 1] = { correct: true, wrong: false };
        this.tutorialPhrase = "Bravo, vous avez cliqué sur une réponse juste, comme vous pouvez le voir, le bouton est devenu vert,  signifiant ainsi que vous avez répondu correctement à la question, mettant donc fin à ce tutoriel.\n\nN'oubliez pas que vous pouvez arrêter le quiz à tout moment en cliquant sur quitter (en haut à droite).\n Si vous le voulez vous pouvez recommencer le tutoriel en cliquant sur le bouton 'Recommencer le tutoriel', sinon cliquez sur 'Revenir au quiz'";
        break;
    }

  }

  handleTipsButtonClick() {
    this.tutorialPhrase = "Comme vous l'avez vu, la réponse comporte le numéro 2, essayez maitenant de cliquer sur Personne2.";
  }

  goToQuiz() {
    this.router.navigate(['quiz/']);
  }

  resetButtonColors() {
    this.buttonColors.forEach(buttonColor => {
      buttonColor.correct = false;
      buttonColor.wrong = false;
    });
    this.tutorialPhrase = "Bienvenue dans ce tutoriel, pour commencer cliquez avec le clic gauche de la souris sur le bouton Personne3 qui est une des propositions de réponses à la question";
  }
}

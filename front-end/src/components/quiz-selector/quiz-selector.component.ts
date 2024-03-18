import { Component, EventEmitter, Output } from '@angular/core';
import { TagsSelectorComponent } from '../tags-selector/tags-selector.component';
import { SearchQuizSelectorComponent } from '../search-quiz-selector/search-quiz-selector.component';
import { QuizSelectorContainerComponent } from '../quiz-selector-container/quiz-selector-container.component';

@Component({
    selector: 'app-quiz-selector',
    standalone: true,
    imports: [
        TagsSelectorComponent,
        SearchQuizSelectorComponent,
        QuizSelectorContainerComponent
    ],
    templateUrl: './quiz-selector.component.html',
    styleUrl: './quiz-selector.component.scss'
})

export class QuizSelectorComponent { }
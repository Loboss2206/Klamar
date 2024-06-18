import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IQuestion from '../interfaces/IQuestion';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private questionsOrderSource = new BehaviorSubject<IQuestion[]>([]);
    questionsOrder$ = this.questionsOrderSource.asObservable();

    setQuestionsOrder(questions: IQuestion[]): void {
        this.questionsOrderSource.next(questions);
    }
}

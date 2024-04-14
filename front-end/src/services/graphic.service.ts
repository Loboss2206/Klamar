import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import IGraphic from "../interfaces/IGraphic";
import {graphic} from "../mocks/graphic";

@Injectable({
  providedIn: 'root'
})
export class GraphicService {
  getGraphic(id : string | null) : Observable<IGraphic | undefined>{
    return of(graphic.find(graphic => graphic.chartId === id))

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './../models/todo.class';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public API : string  = "http://localhost:3000/data";
  constructor(public http : HttpClient) { }

  getAllTodo() : Observable<Todo []>{
      // return this.http.get(this.API);
      return this.http.get<Todo[]>(this.API);
  }

  addTodo(todo : Todo) : Observable<Todo []>{
     return this.http.post<Todo[]>(this.API, todo);
  }

  onUpdateTodo(todo : Todo) : Observable<Todo []> {
    return this.http.put<Todo[]>(`${this.API}/${todo.id}`, todo);

  }


  onDeleteTodo(id:number) : Observable<Todo []>{
    return this.http.delete<Todo[]>(`${this.API}/${id}`);
 }


  handleError(err){
    if(err.error instanceof Error){
      console.log(`Client-side err : ${err.error.message}`);
    }
    else{
      console.log(`Serve-side err : ${err.status}`);
    }
  }
}

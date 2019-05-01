import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../../service/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from './../../models/todo.class';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  public subscription : Subscription;
  constructor(public todoService : TodoService) { }
  public todos : Todo[] = [];
  public todo : Todo = null;
  public name:string = '';
  public price:number = 0;
  public category_id:number = 0;

  ngOnInit() {
    this.loadData();
  }

  loadData(){
     this.subscription = this.todoService.getAllTodo().subscribe(data =>{
         this.todos =  data;
     }, error => {
        this.todoService.handleError(error);
    });
  }

  onAddTodo(){
      console.log(this.name +" "+ this.price + " "+ this.category_id);
      let todo = new Todo(this.name,this.price,this.category_id);
      this.subscription = this.todoService.addTodo(todo).subscribe(data =>{
         console.log(data);
      }, error => {
          this.todoService.handleError(error);
      });
  }

  onEditTodo(item : Todo){
    this.todo = item;
  }


  onUpdateTodo(){
      this.subscription = this.todoService.onUpdateTodo(this.todo).subscribe(data => {
        let index = this.getIndex(data.id);
       this.todos[index] = data;
      }, error => {
        this.todoService.handleError(error);
      });
  }

  getIndex(id : number){
      let result = 0;
      this.todos.forEach((item, index) => {
        if(item.id == id){
            result = index;
        }
      });
      return result;
  }

  onDeleteTodo(id:number){
    this.subscription = this.todoService.onDeleteTodo(id).subscribe(data => {
        let index = this.getIndex(data.id);
        this.todos.splice(index, 1);
    }, error =>{
      this.todoService.handleError(error);
    });
  }

  ngOnDestroy(){
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}

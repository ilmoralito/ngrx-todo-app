import { Component } from "@angular/core";
import * as fromTodos from "./state/todo.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TodoModel } from "./models/todo.model";
import { todoActions } from "./state/todo.actions";
import { getRandomWords } from "../utils/string.utils";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent {
  entities$: Observable<TodoModel[]>;
  filter$: Observable<fromTodos.filterType>;

  constructor(private readonly store: Store<fromTodos.State>) {
    this.entities$ = this.store.select(fromTodos.selectTodosByFilter);
    this.filter$ = this.store.select(fromTodos.selectFilter);
  }

  add() {
    this.store.dispatch(
      todoActions.add({
        entity: <TodoModel>{
          id: crypto.randomUUID(),
          task: getRandomWords(),
          completed: false,
        },
      })
    );
  }

  edit(entity: TodoModel) {
    this.store.dispatch(
      todoActions.edit({ id: entity.id, entity: { task: getRandomWords() } })
    );
  }

  toggle(id: string) {
    this.store.dispatch(todoActions.toggle({ id }));
  }

  delete(id: string) {
    this.store.dispatch(todoActions.delete({ id }));
  }

  filter(filterBy: fromTodos.filterType) {
    this.store.dispatch(todoActions.filter({ filterBy }));
  }
}

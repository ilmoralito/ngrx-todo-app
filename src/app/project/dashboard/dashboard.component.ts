import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromTodos from "../todos/state/todo.reducer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  todos$: Observable<number>;

  constructor(private readonly store: Store<fromTodos.State>) {
    this.todos$ = this.store.select(fromTodos.selectTodosTotal);
  }
}

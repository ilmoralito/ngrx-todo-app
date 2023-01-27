import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodosRoutingModule } from "./todos-routing.module";
import { TodosComponent } from "./todos.component";
import { StoreModule } from "@ngrx/store";
import * as fromTodos from "./state/todo.reducer";

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("todos", fromTodos.reducer),
    TodosRoutingModule,
  ],
})
export class TodosModule {}

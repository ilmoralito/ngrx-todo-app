import { ActionReducerMap } from "@ngrx/store";
import * as fromTodos from "../todos/state/todo.reducer";

export const reducers: ActionReducerMap<any> = {
    todos: fromTodos.reducer,
};

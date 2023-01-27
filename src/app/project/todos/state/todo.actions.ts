import { createActionGroup, props } from "@ngrx/store";
import { TodoModel } from "../models/todo.model";
import { filterType } from "./todo.reducer";

export const todoActions = createActionGroup({
    source: "Todo component",
    events: {
        Add: props<{ entity: TodoModel }>(),
        Edit: props<{ id: string; entity: Partial<TodoModel> }>(),
        Delete: props<{ id: string }>(),
        Toggle: props<{ id: string }>(),
        Filter: props<{ filterBy: filterType }>(),
    },
});

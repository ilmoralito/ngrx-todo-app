import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { TodoModel } from "../models/todo.model";
import { todoActions } from "./todo.actions";

export type filterType = "all" | "pending" | "completed";

export interface State {
    entities: TodoModel[];
    filter: filterType;
}

export const intialState: State = {
    entities: [],
    filter: "all",
};

export const todoFeature = createFeature({
    name: "todos",
    reducer: createReducer(
        intialState,
        on(todoActions.add, (state, { entity }) => ({
            ...state,
            entities: [...state.entities, entity],
        })),
        on(todoActions.edit, (state, { id, entity }) => ({
            ...state,
            entities: state.entities.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          task: entity.task!,
                      }
                    : { ...todo }
            ),
        })),
        on(todoActions.toggle, (state, { id }) => ({
            ...state,
            entities: state.entities.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : { ...todo }
            ),
        })),
        on(todoActions.delete, (state, { id }) => ({
            ...state,
            entities: state.entities.filter((entity) => entity.id !== id),
        })),
        on(todoActions.filter, (state, { filterBy }) => ({
            ...state,
            filter: filterBy,
        }))
    ),
});

export const { name, reducer, selectEntities, selectFilter, selectTodosState } =
    todoFeature;

export const selectTodosByFilter = createSelector(
    selectFilter,
    selectEntities,
    (filter, entities) =>
        filter === "all"
            ? entities
            : filter === "pending"
            ? entities.filter((entity) => !entity.completed)
            : entities.filter((entity) => entity.completed)
);

export const selectTodosTotal = createSelector(
    selectEntities,
    (entities) => entities.length
);

export const selectTodosStateSummary = createSelector(
    selectEntities,
    (entities) =>
        entities.reduce(
            (previous, current) => {
                previous.all += 1;

                if (!current.completed) {
                    previous.pending += 1;
                }

                if (current.completed) {
                    previous.completed += 1;
                }

                return previous;
            },
            { all: 0, pending: 0, completed: 0 }
        )
);

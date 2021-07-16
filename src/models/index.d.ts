import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class TodoItem {
  readonly id: string;
  readonly Title: string;
  readonly Description: string;
  readonly Status?: number;
  readonly Date: string;
  constructor(init: ModelInit<TodoItem>);
  static copyOf(source: TodoItem, mutator: (draft: MutableModel<TodoItem>) => MutableModel<TodoItem> | void): TodoItem;
}
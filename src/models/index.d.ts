import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class TodoModel {
  readonly id: string;
  readonly Title: string;
  readonly Description: string;
  readonly Status: number;
  readonly DueDate: string;
  constructor(init: ModelInit<TodoModel>);
  static copyOf(source: TodoModel, mutator: (draft: MutableModel<TodoModel>) => MutableModel<TodoModel> | void): TodoModel;
}
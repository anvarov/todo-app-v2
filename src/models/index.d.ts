import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TodoModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TodoModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly status: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TodoModel, TodoModelMetaData>);
  static copyOf(source: TodoModel, mutator: (draft: MutableModel<TodoModel, TodoModelMetaData>) => MutableModel<TodoModel, TodoModelMetaData> | void): TodoModel;
}
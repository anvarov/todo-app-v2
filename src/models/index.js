// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TodoItem } = initSchema(schema);

export {
  TodoItem
};
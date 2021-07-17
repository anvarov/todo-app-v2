// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TodoModel } = initSchema(schema);

export {
  TodoModel
};
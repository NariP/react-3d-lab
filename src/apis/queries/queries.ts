import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import exampleQueries from '@/apis/queries/exampleQueries';
import type { inferQueryKeyStore } from '@lukemorales/query-key-factory';

const queries = mergeQueryKeys(exampleQueries);

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export default queries;

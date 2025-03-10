import * as R from 'ramda';
import { ABSTRACT_INTERNAL_OBJECT, schemaTypes } from './general';

export const ENTITY_TYPE_SETTINGS = 'Settings';
export const ENTITY_TYPE_MIGRATION_STATUS = 'MigrationStatus';
export const ENTITY_TYPE_MIGRATION_REFERENCE = 'MigrationReference';
export const ENTITY_TYPE_TOKEN = 'Token';
export const ENTITY_TYPE_GROUP = 'Group';
export const ENTITY_TYPE_USER = 'User';
export const ENTITY_TYPE_ROLE = 'Role';
export const ENTITY_TYPE_CAPABILITY = 'Capability';
export const ENTITY_TYPE_CONNECTOR = 'Connector';
export const ENTITY_TYPE_ATTRIBUTE = 'Attribute';
export const ENTITY_TYPE_WORKSPACE = 'Workspace';
export const ENTITY_TYPE_WORK = 'work';
export const ENTITY_TYPE_TASK = 'Task';
export const ENTITY_TYPE_TAXII_COLLECTION = 'TaxiiCollection';
export const ENTITY_TYPE_STREAM_COLLECTION = 'StreamCollection';
const DATED_INTERNAL_OBJECTS = [
  ENTITY_TYPE_SETTINGS,
  ENTITY_TYPE_TOKEN,
  ENTITY_TYPE_GROUP,
  ENTITY_TYPE_USER,
  ENTITY_TYPE_ROLE,
  ENTITY_TYPE_CAPABILITY,
  ENTITY_TYPE_CONNECTOR,
  ENTITY_TYPE_WORKSPACE,
];
const INTERNAL_OBJECTS = [
  ENTITY_TYPE_SETTINGS,
  ENTITY_TYPE_TAXII_COLLECTION,
  ENTITY_TYPE_STREAM_COLLECTION,
  ENTITY_TYPE_TASK,
  ENTITY_TYPE_MIGRATION_STATUS,
  ENTITY_TYPE_MIGRATION_REFERENCE,
  ENTITY_TYPE_TOKEN,
  ENTITY_TYPE_GROUP,
  ENTITY_TYPE_USER,
  ENTITY_TYPE_ROLE,
  ENTITY_TYPE_CAPABILITY,
  ENTITY_TYPE_CONNECTOR,
  ENTITY_TYPE_ATTRIBUTE,
  ENTITY_TYPE_WORKSPACE,
];
const HISTORY_OBJECTS = [ENTITY_TYPE_WORK];
schemaTypes.register(ABSTRACT_INTERNAL_OBJECT, INTERNAL_OBJECTS);
export const isInternalObject = (type) => R.includes(type, INTERNAL_OBJECTS) || type === ABSTRACT_INTERNAL_OBJECT;
export const isDatedInternalObject = (type) => R.includes(type, DATED_INTERNAL_OBJECTS);
export const isHistoryObject = (type) => R.includes(type, HISTORY_OBJECTS);

export const internalObjectsAttributes = {
  [ENTITY_TYPE_SETTINGS]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'platform_title',
    'platform_email',
    'platform_url',
    'platform_theme',
    'platform_language',
    'platform_login_message',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_MIGRATION_STATUS]: ['internal_id', 'standard_id', 'entity_type', 'lastRun'],
  [ENTITY_TYPE_MIGRATION_REFERENCE]: ['internal_id', 'standard_id', 'entity_type', 'title', 'timestamp'],
  [ENTITY_TYPE_TOKEN]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'uuid',
    'name',
    'duration',
    'issuer',
    'revoked',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_GROUP]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'name',
    'description',
    'default_assignation',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_USER]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'user_email',
    'password',
    'name',
    'description',
    'firstname',
    'lastname',
    'theme',
    'language',
    'external',
    'dashboard',
    'bookmarks',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_ROLE]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'name',
    'default_assignation',
    'description',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_CAPABILITY]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'name',
    'attribute_order',
    'description',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_CONNECTOR]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'name',
    'active',
    'auto',
    'only_contextual',
    'connector_type',
    'connector_scope',
    'connector_state',
    'connector_state_reset',
    'connector_user_id',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_ATTRIBUTE]: ['internal_id', 'standard_id', 'entity_type', 'key', 'value'],
  [ENTITY_TYPE_WORKSPACE]: [
    'internal_id',
    'standard_id',
    'entity_type',
    'identifier',
    'name',
    'description',
    'manifest',
    'owner',
    'type',
    'tags',
    'graph_data',
    'created_at',
    'i_created_at_day',
    'i_created_at_month',
    'i_created_at_year',
    'updated_at',
  ],
  [ENTITY_TYPE_TAXII_COLLECTION]: ['internal_id', 'standard_id', 'name', 'description', 'filters'],
  [ENTITY_TYPE_STREAM_COLLECTION]: ['internal_id', 'standard_id', 'name', 'description', 'filters'],
  [ENTITY_TYPE_TASK]: [
    'standard_id',
    'task_position',
    'task_processed_number',
    'task_expected_number',
    'last_execution_date',
    'completed',
  ],
};
R.forEachObjIndexed((value, key) => schemaTypes.registerAttributes(key, value), internalObjectsAttributes);

import { ViewMetadata } from './typings/viewMetadata';
import { Constructor } from '../common/types';

export const viewMetadataStore = new Map<Constructor, ViewMetadata>();

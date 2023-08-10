import { ReactNode } from 'react';
import { TypeDef } from '@polkadot/types/types';
import { StorageEntryMetadataLatest } from '@polkadot/types/interfaces';

export interface Props {
  className?: string;
  children?: ReactNode;

  [prop: string]: unknown;
}

export interface NetworkInfo {
  id: string;
  name: string;
  logo: string;
  provider: string;
  prefix: number;
  symbol: string;
  decimals: number;
  subscanUrl: string;
}

export enum BalanceType {
  Free = 'Free Balance',
  Locked = 'Locked Balance',
  Reserved = 'Reserved Balance',
  Frozen = 'Frozen Balance',
}

export interface TypeDefExt extends TypeDef {
  withOptionActive?: boolean;
}

export type ParamsType = { name?: string; type: TypeDefExt }[];

export interface StorageValueBase {
  section: string;
  method: string;
  params: ParamsType;
  meta: StorageEntryMetadataLatest;
}

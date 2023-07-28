import { ReactNode } from 'react';

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

import { BasicStatistics } from '../model/statistics';

export interface OverviewProps<T = BasicStatistics> {
   data: T;
   title: string;
   icon: JSX.Element;
   style?: React.CSSProperties;
   mainKey?: 'amount' | 'total';
}

import axios from 'axios';
import { Statistic, StatisticsType } from '../model/statistics';
import { axiosApi } from './base.api';

export function getStatisticsOverview() {
   const result = axiosApi({
      url: 'statistics/overview',
      method: 'get'
   });
   return result;
}

export function getStatistics<T, U = Statistic>(type: StatisticsType, userId?: number) {
   const result = axiosApi({
      url: 'statistics/' + type,
      method: 'get',
      params: {
         userId: userId ?? null
      }
   });
   return result;
}

/*
 * Helper Function
 * To get the countries of a specific region
 * */
export const getWorld = async () => {
   return await axios.get('https://code.highcharts.com/mapdata/custom/world-palestine-highres.geo.json');
};

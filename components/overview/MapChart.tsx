import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { useEffect, useState } from 'react';
import { getWorld } from '../../lib/api/statistics.api';
import { CommonChartComponentProps } from '../../lib/model/statistics';

export default function MapChart({ data, title }: CommonChartComponentProps) {
   const [world, setWorld] = useState<any>(null);
   const [options, setOptions] = useState<any>({
      colorAxis: {
         min: 0,
         stops: [
            [0, '#fff'],
            [0.5, Highcharts?.getOptions().colors[0]],
            [1, '#1890ff']
         ]
      },
      legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'bottom'
      },
      credits: {
         enabled: false
      },
      exporting: {
         enabled: false
      }
   });

   useEffect(() => {
      (async () => {
         const res = await getWorld();

         setWorld(res.data);
         setOptions({
            series: [{ mapData: res.data }]
         });
      })();
   }, []);

   useEffect(() => {
      if (!data || !world) {
         return;
      }

      const mapSource = data.map((item) => {
         const target = world.features.find(
            (feature: { properties: { name: string } }) => item.name.toLowerCase() === feature.properties.name.toLowerCase()
         );

         return !!target
            ? {
                 'hc-key': target.properties['hc-key'],
                 value: item.amount
              }
            : {};
      });

      const options = {
         title: {
            text: `<span style="text-transform: capitalize">${title?.split(/(?=[A-Z])/).join(' ')}</span>`
         },
         series: [
            {
               data: mapSource,
               mapData: world,
               name: 'Total',
               states: {
                  hover: {
                     color: '#a4edba'
                  }
               }
            }
         ]
      };

      setOptions(options);
   }, [data, world]);

   return <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={options}></HighchartsReact>;
}

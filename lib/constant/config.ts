import { Gutter } from 'antd/lib/grid/row';

export const programLanguageColors: string[] = ['magenta', 'volcano', 'orange', 'gold', 'green', 'cyan', 'geekblue', 'purple', 'red', 'lime'];

export const gutter: [Gutter, Gutter] = [6, 16];

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export enum DurationUnit {
   'year' = 1,
   'month',
   'day',
   'week',
   'hour'
}

export enum SkillDes {
   'Know' = 1,
   'Practiced',
   'Comprehend',
   'Expert',
   'Master'
}

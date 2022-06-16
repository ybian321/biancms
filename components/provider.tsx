import { createContext, useContext } from 'react';

export const MessageStatisticsContext = createContext<{ msgStore; dispatch }>(null);

export const useMsgStatistic = () => useContext<{ msgStore; dispatch }>(MessageStatisticsContext);

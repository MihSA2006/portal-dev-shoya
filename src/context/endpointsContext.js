import { createContext, useContext } from 'react';

export const EndpointsContext = createContext(null);

export const useEndpoints = () => {
  const context = useContext(EndpointsContext);
  if (!context) throw new Error('useEndpoints doit être utilisé dans <EndpointsProvider>.');
  return context;
};

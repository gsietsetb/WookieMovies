import React, {useContext} from 'react';
import {createMovieStore, TStore} from './MovieStore';
import {useLocalStore} from 'mobx-react';

export const storeContext = React.createContext<TStore | null>(null);

export const useStores = () => useContext(storeContext);

/*export const useStores = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
) => {
  const value = React.useContext(context);
  if (!value) {
    throw new Error();
  }
  const store = storeSelector(value);
  return useObserver(() => {
    return dataSelector(store);
  });
};*/

export const StoreProvider: React.FC = ({children}) => {
  const movieStore = useLocalStore(createMovieStore);
  return (
    <storeContext.Provider value={movieStore}>{children}</storeContext.Provider>
  );
};

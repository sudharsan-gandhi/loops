import createContext from 'zustand/context';

const { Provider, useStore } = createContext()

// const createStore = () => create()

export const ZuStore: React.FC = ({ children }) => {

  return <>{children}</>;
};

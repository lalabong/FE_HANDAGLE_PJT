import { useDeviceStore } from '@/store/useDeviceStore';
import { useEffect } from 'react';
import AppRouter from './AppRouter';

const App = () => {
  const checkDeviceType = useDeviceStore((state) => state.checkDeviceType);

  useEffect(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, [checkDeviceType]);

  return <AppRouter />;
};

export default App;

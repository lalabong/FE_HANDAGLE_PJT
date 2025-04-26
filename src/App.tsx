import { useDeviceStore } from '@/stores/useDeviceStore';
import { useEffect } from 'react';
import AppRouter from './router/AppRouter';

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

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div>헤더</div>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

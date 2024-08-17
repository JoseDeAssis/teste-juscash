import { Outlet } from 'react-router-dom';

const DefaultPage = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default DefaultPage;

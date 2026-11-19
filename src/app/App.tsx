import { Route, Routes } from 'react-router-dom';
import ComponentsPage from '../pages/ComponentsPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ExamplesPage from '../pages/ExamplesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="/examples" element={<ExamplesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

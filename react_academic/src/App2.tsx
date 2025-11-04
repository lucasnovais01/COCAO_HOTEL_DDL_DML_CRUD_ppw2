import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DevTools from "./views/DevTools";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DevTools />} />
          <Route path="/devtools" element={<DevTools />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
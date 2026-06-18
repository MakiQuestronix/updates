import { Routes, Route } from "react-router-dom";

//pages
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyCode from "./pages/VerifyCode";
import Layout from "./pages/Layout";
import Workspaces from "./pages/Workspaces";
import Knowledges from "./pages/Knowledges";
import Documents from "./pages/Documents";
import Dashboard from "./pages/Dashboard";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import WorkspaceStaff from "./pages/WorkspaceStaff";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/VerifyCode" element={<VerifyCode />} />
        <Route path="/Layout/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workspace">
            <Route index element={<Workspaces />} />
            <Route path=":id" element={<WorkspaceDetails />} />
            <Route path=":id/staff/:staffId" element={<WorkspaceStaff />} />
          </Route>
          <Route path="knowledges" element={<Knowledges />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

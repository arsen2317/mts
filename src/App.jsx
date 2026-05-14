import { useState } from "react";
import DelegationList from "./DelegationList";
import Form from "./Form";

export default function App() {
  const [page, setPage] = useState("list");
  const [toast, setToast] = useState(false);

  const navigate = (target, showToast = false) => {
    setPage(target);
    if (showToast) setToast(true);
  };

  if (page === "form") {
    return <Form onNavigate={navigate} />;
  }
  return <DelegationList onNavigate={navigate} toast={toast} onToastDone={() => setToast(false)} />;
}

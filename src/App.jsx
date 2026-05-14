import { useState } from "react";
import DelegationList from "./DelegationList";
import Form from "./Form";
import EditForm from "./EditForm";

export default function App() {
  const [page, setPage] = useState("list");
  const [toast, setToast] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const navigate = (target, showToast = false, item = null) => {
    setPage(target);
    if (showToast) setToast(true);
    if (item) setEditItem(item);
  };

  if (page === "form") return <Form onNavigate={navigate} />;
  if (page === "edit") return <EditForm item={editItem} onNavigate={navigate} />;
  return <DelegationList onNavigate={navigate} toast={toast} onToastDone={() => setToast(false)} />;
}

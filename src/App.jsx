import { useState } from "react";
import DelegationList from "./DelegationList";
import Form from "./Form";

export default function App() {
  const [page, setPage] = useState("list"); // "list" | "form"

  if (page === "form") {
    return <Form onNavigate={setPage} />;
  }
  return <DelegationList onNavigate={setPage} />;
}

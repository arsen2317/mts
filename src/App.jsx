import { useState } from "react";
import Form from "./Form";
import DelegationList from "./DelegationList";

export default function App() {
  const [page, setPage] = useState("list");

  if (page === "form") {
    return <Form onBack={() => setPage("list")} />;
  }

  return <DelegationList onCreateNew={() => setPage("form")} />;
}

import { useState } from "react";
import { FONT_CSS, Header, SelectField, Checkbox, Banner, BTN_STYLE } from "./ds";

const DATA = {
  delegates: [
    { id: "dl1", name: "Монахов Михаил Константинович" },
    { id: "dl2", name: "Монахов Андрей Константинович" },
    { id: "dl3", name: "Громова Светлана Александровна" },
    { id: "dl4", name: "Иванов Иван Иванович" },
  ].sort((a, b) => a.name.localeCompare(b.name, "ru")),
  divisions: [
    { id: "d1", name: "Стрим Платежи и переводы на Дэйли витринах" },
    { id: "d2", name: "Центр компетенций портальных решений" },
    { id: "d3", name: "Разработка продуктов" },
  ],
  campaigns: {
    d1: [
      { id: "c1", name: "15.11.2026 – 20.11.2026 Performance review" },
      { id: "c2", name: "01.12.2026 – 15.12.2026 Talent review" },
    ],
    d2: [{ id: "c3", name: "15.11.2026 – 20.11.2026 Performance review" }],
    d3: [{ id: "c4", name: "01.11.2026 – 10.11.2026 Annual review" }],
  },
  employees: {
    c1: [
      { id: "e1", name: "Иванов Иван Иванович" },
      { id: "e2", name: "Коновалов Александр Григорьевич" },
      { id: "e3", name: "Константинопольский Алексей Алексеевич" },
      { id: "e4", name: "Игнатов Дмитрий Владимирович" },
      { id: "e5", name: "Васильев Евгений Викторович" },
      { id: "e6", name: "Монахов Михаил Константинович" },
      { id: "e7", name: "Петрова Анна Сергеевна" },
    ],
    c2: [
      { id: "e1", name: "Иванов Иван Иванович" },
      { id: "e2", name: "Коновалов Александр Григорьевич" },
    ],
    c3: [
      { id: "e8", name: "Орлов Кирилл" },
      { id: "e9", name: "Смирнова Юлия" },
    ],
    c4: [
      { id: "e10", name: "Козлов Артём" },
      { id: "e11", name: "Новикова Лена" },
    ],
  },
};

// ─── Main Form ────────────────────────────────────────────────────────

export default function Form({ onNavigate }) {
  function Breadcrumbs() {
    const crumbs = ["Пульс", "Мои документы", "Талант-ревью", "Делегирование", "Создание делегирования"];
    const crumbActions = [null, null, null, () => onNavigate && onNavigate("list"), null];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span onClick={crumbActions[i] ?? undefined} style={{ fontSize: 14, lineHeight: "20px", color: i === crumbs.length - 1 ? "#1D2023" : "#8C9BAB", cursor: crumbActions[i] ? "pointer" : "default" }}>{c}</span>
            {i < crumbs.length - 1 && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M5.5 3L10.5 8L5.5 13" stroke="#BCC3D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        ))}
      </div>
    );
  }
  const [delegate, setDelegate] = useState("");
  const [division, setDivision] = useState("");
  const [campaign, setCampaign] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const campaignOptions = division ? (DATA.campaigns[division] || []) : [];
  const employeeOptions = campaign
    ? [...(DATA.employees[campaign] || [])].sort((a, b) => a.name.localeCompare(b.name, "ru"))
    : [];

  const handleDivision = (val) => {
    const changed = division && division !== val;
    setDivision(val);
    if (changed) { setCampaign(""); setEmployees([]); setSelectAll(false); }
  };

  const handleCampaign = (val) => {
    const changed = campaign && campaign !== val;
    setCampaign(val);
    if (changed) { setEmployees([]); setSelectAll(false); }
  };

  const handleEmployees = (val) => {
    setEmployees(val);
    setSelectAll(employeeOptions.length > 0 && val.length === employeeOptions.length);
  };

  const handleSelectAll = (val) => {
    setSelectAll(val);
    setEmployees(val ? employeeOptions.map(e => e.id) : []);
  };

  const delegateObj = DATA.delegates.find(d => d.id === delegate);
  const delegateInEmployees = delegate && delegateObj && employees.some(eid => {
    const emp = employeeOptions.find(e => e.id === eid);
    return emp && emp.name === delegateObj.name;
  });

  const allFilled = delegate && division && campaign && employees.length > 0;


  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'MTSCompact', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }` + FONT_CSS}</style>
      <Header />
      <div style={{ padding: "0 88px 88px" }}>
        <div style={{ paddingTop: 24 }}><Breadcrumbs /></div>
        <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: "36px", fontFamily: "'MTSWide', sans-serif", color: "#1D2023", margin: "36px 0 44px" }}>Создание делегирования</h1>

        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column" }}>

          <div style={{ marginBottom: 8 }}>
            <SelectField label="Кому делегировать" value={delegate} options={DATA.delegates} onChange={setDelegate} showInfo={true} searchable={true} />
          </div>
          <div style={{ fontSize: 12, lineHeight: "16px", color: "#8C9BAB", marginBottom: 24, paddingLeft: 4 }}>
            Доступен выбор всех сотрудников банка. Исключения: председатель правления, грейд А, уволенные, сотрудники в декрете
          </div>

          <div style={{ marginBottom: 24 }}>
            <SelectField label="Подразделение" value={division} options={DATA.divisions} onChange={handleDivision} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <SelectField label="Кампания" value={campaign} options={campaignOptions} onChange={handleCampaign} disabled={!division} lockedHint={!division ? "Сначала выберите подразделение" : null} />
          </div>
          <div style={{ fontSize: 12, lineHeight: "16px", color: "#8C9BAB", marginBottom: 24, paddingLeft: 4 }}>
            Доступна только ближайшая кампания, назначенная на ваше подразделение
          </div>

          <div style={{ marginBottom: 16 }}>
            <SelectField label="Сотрудники" value={employees} options={employeeOptions} onChange={handleEmployees} disabled={!campaign} multi={true} searchable={true} lockedHint={!division ? "Сначала выберите подразделение" : !campaign ? "Сначала выберите кампанию" : null} />
          </div>

          <div style={{ marginBottom: delegateInEmployees ? 16 : 32 }}>
            <Checkbox checked={selectAll} onChange={handleSelectAll} label="Выбрать всех сотрудников" />
          </div>

          {delegateInEmployees && (
            <div style={{ marginBottom: 32 }}>
              <Banner type="error" title={`Вами выбран сотрудник ${delegateObj?.name}, который также указан делегатом`} subtitle="Пожалуйста, смените делегата или выберите другого сотрудника для делегирования" />
            </div>
          )}

          <div>
            <button onClick={() => allFilled && !delegateInEmployees && setShowConfirm(true)} disabled={!allFilled || !!delegateInEmployees}
              style={{ height: 52, padding: "0 32px", background: allFilled && !delegateInEmployees ? "#0066FF" : "#BCC3D0", color: "#fff", border: "none", borderRadius: 10, cursor: allFilled && !delegateInEmployees ? "pointer" : "not-allowed", transition: "background 0.2s", ...BTN_STYLE }}>
              СОЗДАТЬ ДЕЛЕГИРОВАНИЕ
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowConfirm(false)}>
          <div style={{ width: 480, background: "#fff", borderRadius: 32, padding: "32px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }} onClick={e => e.stopPropagation()}>
            <div style={{ paddingLeft: 16, paddingRight: 16, display: "flex", flexDirection: "column", gap: 8, alignSelf: "stretch" }}>
              <div style={{ textAlign: "center", color: "#1D2023", fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px" }}>Вы уверены, что хотите создать новое делегирование?</div>
              <div style={{ textAlign: "center", color: "#626C77", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>Делегату будет отправлено уведомление</div>
            </div>
            <div style={{ alignSelf: "stretch", paddingTop: 24, display: "flex", gap: 12 }}>
              <button onClick={() => { setShowConfirm(false); onNavigate && onNavigate("list", true); }} style={{ flex: 1, height: 52, background: "#0066FF", color: "#fff", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>СОХРАНИТЬ</button>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, height: 52, background: "#F2F3F7", color: "#1D2023", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>ОТМЕНА</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

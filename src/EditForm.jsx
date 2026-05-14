import { useState } from "react";
import { FONT_CSS, Header, SelectField, Checkbox, BTN_STYLE } from "./ds";

function Breadcrumbs({ onNavigate }) {
  const crumbs = ["Пульс", "Мои документы", "Талант-ревью", "Делегирование", "Редактирование делегирования"];
  const crumbActions = [null, null, null, () => onNavigate("list"), null];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span onClick={crumbActions[i] ?? undefined} style={{ fontSize: 14, lineHeight: "20px", color: i === crumbs.length - 1 ? "#1D2023" : "#626C77", cursor: crumbActions[i] ? "pointer" : "default" }}>{c}</span>
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

function LockedField({ label, value, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <span style={{ fontSize: 14, lineHeight: "20px", color: "#969FA8" }}>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="7" width="10" height="8" rx="2" stroke="#BBC1C7" strokeWidth="1.2"/>
          <path d="M5 7V5a3 3 0 016 0v2" stroke="#BBC1C7" strokeWidth="1.2"/>
        </svg>
      </div>
      <div style={{ height: 52, paddingLeft: 12, paddingRight: 8, background: "#F8F8FB", borderRadius: 16, border: "1px solid rgba(188,195,208,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 17, lineHeight: "24px", color: "#969FA8" }}>{value}</span>
        <div style={{ padding: 4, opacity: 0.6, display: "flex", alignItems: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#8D969F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {hint && <span style={{ fontSize: 12, lineHeight: "16px", color: "#626C77" }}>{hint}</span>}
    </div>
  );
}

export default function EditForm({ item, onNavigate }) {
  const employeeOptions = (item.employeeDetails || []).map((e, i) => ({ id: `e${i}`, name: e.name }));

  const [employees, setEmployees] = useState(employeeOptions.map(e => e.id));
  const [selectAll, setSelectAll] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEmployees = (val) => {
    setEmployees(val);
    setSelectAll(employeeOptions.length > 0 && val.length === employeeOptions.length);
  };

  const handleSelectAll = (val) => {
    setSelectAll(val);
    setEmployees(val ? employeeOptions.map(e => e.id) : []);
  };

  const delegateLabel = item.name;
  const campaignLabel = `${item.campaign} ${item.dates}`;
  const divisionLabel = item.division;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'MTSCompact', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }` + FONT_CSS}</style>
      <Header />
      <div style={{ padding: "0 88px 88px" }}>
        <div style={{ paddingTop: 24 }}><Breadcrumbs onNavigate={onNavigate} /></div>
        <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: "36px", fontFamily: "'MTSWide', sans-serif", color: "#1D2023", margin: "36px 0 44px" }}>Редактирование делегирования</h1>

        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 24 }}>

          <LockedField
            label="Делегат"
            value={delegateLabel}
            hint="Доступен выбор всех сотрудников банка. Исключения: председатель правления, грейд А, уволенные, сотрудники в декрете"
          />

          <LockedField
            label="Кампания"
            value={campaignLabel}
            hint="Доступна только ближайшая кампания, назначенная на ваше подразделение"
          />

          <LockedField
            label="Подразделение"
            value={divisionLabel}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SelectField
              label="Сотрудники"
              value={employees}
              options={employeeOptions}
              onChange={handleEmployees}
              multi={true}
            />
            <Checkbox checked={selectAll} onChange={handleSelectAll} label="Выбрать всех сотрудников" />
          </div>

          <div>
            <button
              onClick={() => employees.length > 0 && setShowConfirm(true)}
              disabled={employees.length === 0}
              style={{ height: 44, padding: "0 24px", background: employees.length > 0 ? "#0066FF" : "#BCC3D0", color: "#fff", border: "none", borderRadius: 16, cursor: employees.length > 0 ? "pointer" : "not-allowed", transition: "background 0.2s", ...BTN_STYLE }}
            >
              СОХРАНИТЬ ИЗМЕНЕНИЯ
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowConfirm(false)}>
          <div style={{ width: 480, background: "#fff", borderRadius: 32, padding: "32px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }} onClick={e => e.stopPropagation()}>
            <div style={{ paddingLeft: 16, paddingRight: 16, display: "flex", flexDirection: "column", gap: 8, alignSelf: "stretch" }}>
              <div style={{ textAlign: "center", color: "#1D2023", fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px" }}>Вы уверены, что хотите сохранить изменения?</div>
              <div style={{ textAlign: "center", color: "#626C77", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>Делегату будет отправлено уведомление</div>
            </div>
            <div style={{ alignSelf: "stretch", paddingTop: 24, display: "flex", gap: 12 }}>
              <button onClick={() => { setShowConfirm(false); onNavigate("list", true); }} style={{ flex: 1, height: 52, background: "#0066FF", color: "#fff", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>СОХРАНИТЬ</button>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, height: 52, background: "#F2F3F7", color: "#1D2023", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>ОТМЕНА</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

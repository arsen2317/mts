export function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }} onClick={() => onChange(!checked)}>
      <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: `2px solid ${checked ? "#0066FF" : "#BCC3D0"}`, background: checked ? "#0066FF" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }} onClick={e => { e.stopPropagation(); onChange(!checked); }}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 17, lineHeight: "24px", color: "#1D2023" }}>{label}</span>
    </label>
  );
}

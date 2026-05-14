import { useState, useRef, useEffect } from "react";
import { FONT_CSS, Header, BTN_STYLE, SearchIcon, ChevronUp, ChevronDown, BreadChevron, StatusBadge, Tag, Chip, PersonAvatar, Tabs } from "./ds";

const BASE = import.meta.env.BASE_URL;
const AVATARS = {
  "Палевская София":                     BASE + "avatars/sofia.png",
  "Монахов Михаил":                      BASE + "avatars/mikhail.png",
  "Константинопольский Константин":      BASE + "avatars/konstantin.png",
  "Константинопольский Константин Сергеевич": BASE + "avatars/konstantin.png",
  "Ольга Ильина":                        BASE + "avatars/olga.png",
  "Иванова Ирина":                       BASE + "avatars/irina.png",
  "Заковыркина Марина":                  BASE + "avatars/marina.png",
  "Заковыркина Марина Викторовна":       BASE + "avatars/marina.png",
  "Иванова Мария Александровна":         BASE + "avatars/maria.png",
  "Смирнова Ольга Викторовна":           BASE + "avatars/smirnova.png",
  "Новикова Екатерина Дмитриевна":       BASE + "avatars/novikova.png",
  "Гаврилов Андрей Петрович":            BASE + "avatars/gavrilov.png",
  "Жуков Алексей Вадимович":             BASE + "avatars/zhukov.png",
  "Ростиславский Владимир":              BASE + "avatars/rostislavsky.png",
  "Манохин Александр":                   BASE + "avatars/manokhin.png",
  "Артёмов Александр":                   BASE + "avatars/artemov.png",
  "Глаголев Егор":                       BASE + "avatars/egor.png",
};

const BY_ME_ACTIVE = [
  {
    id: 1, status: "planned", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Палевская София", role: "Ведущий специалист по адаптации",
    division: "Центр компетенций портальных решений",
    employees: "Гаврилов А., Жуков А., Ростиславский В., Константинопольский К., Иванова",
    employeeDetails: [
      { name: "Гаврилов Андрей Петрович", role: "Аналитик", status: "assigned" },
      { name: "Жуков Алексей Вадимович", role: "Аналитик", status: "assigned" },
      { name: "Ростиславский Владимир", role: "Старший аналитик", status: "assigned" },
      { name: "Константинопольский Константин Сергеевич", role: "Системный аналитик", status: "assigned" },
      { name: "Иванова Мария Александровна", role: "Аналитик", status: "assigned", declineReason: "сотрудник в отпуске, нет возможности провести встречу" },
    ],
  },
  {
    id: 2, status: "planned", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Константинопольский Константин", role: "Директор по управлению данными",
    division: "Департамент управления данными",
    employees: "Все сотрудники подразделения (12)",
    employeeDetails: [
      { name: "Петров Сергей Николаевич", role: "Ведущий аналитик", status: "assigned" },
      { name: "Смирнова Ольга Викторовна", role: "Аналитик данных", status: "assigned" },
    ],
  },
  {
    id: 3, status: "active", dates: "15.11.2026 – 20.11.2026", campaign: "Performance review",
    name: "Монахов Михаил", role: "Технический лидер Стрима",
    division: "Стрим Платежи и переводы на Дэйли витринах",
    employees: "Все сотрудники подразделения (34)",
    employeeDetails: [
      { name: "Кузнецов Илья Романович", role: "Разработчик", status: "conducted" },
      { name: "Новикова Екатерина Дмитриевна", role: "Тестировщик", status: "assigned" },
      { name: "Борисов Антон Сергеевич", role: "Аналитик", status: "assigned" },
    ],
  },
  {
    id: 4, status: "active", dates: "15.11.2026 – 20.11.2026", campaign: "Performance review",
    name: "Ольга Ильина", role: "Ведущий системный аналитик",
    division: "Стрим Платежи и переводы на Дэйли витринах",
    employees: "Коновалов А., Артюхова Б.",
    employeeDetails: [
      { name: "Ананасов Виктор Владимирович", role: "Аналитик", status: "assigned" },
      { name: "Заковыркина Марина Викторовна", role: "Аналитик", status: "assigned", declineReason: "сотрудник в отпуске, нет возможности провести встречу" },
      { name: "Гаврилов Андрей Петрович", role: "Аналитик", status: "conducted" },
    ],
  },
];

const BY_ME_DONE = [
  {
    id: 5, status: "rejected", dates: "05.03.2026 – 25.03.2026", campaign: "One-on-one",
    name: "Иванова Ирина", role: "Ведущий системный аналитик",
    division: "Центр компетенций портальных решений",
    employees: "Ананасов В., Заковыркина М., Гаврилов А.",
    rejectionReason: "большая загруженность по рабочим задачам, нет возможности провести встречи качественно",
    employeeDetails: [
      { name: "Ананасов Виктор Владимирович", role: "Аналитик", status: "assigned" },
      { name: "Заковыркина Марина Викторовна", role: "Аналитик", status: "assigned" },
      { name: "Гаврилов Андрей Петрович", role: "Аналитик", status: "assigned" },
    ],
  },
  {
    id: 6, status: "rejected", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Манохин Александр", role: "Директор по управлению данными",
    division: "Департамент управления данными",
    employees: "Смирнова О., Новикова Е.",
    employeeDetails: [
      { name: "Смирнова Ольга Викторовна", role: "Аналитик", status: "assigned", declineReason: "сотрудник в отпуске, нет возможности провести встречу" },
      { name: "Новикова Екатерина Дмитриевна", role: "Аналитик", status: "assigned", declineReason: "конфликт интересов" },
    ],
  },
  {
    id: 7, status: "done", dates: "15.11.2026 – 20.11.2026", campaign: "Performance review",
    name: "Монахов Михаил", role: "Технический лидер Стрима",
    division: "Стрим Платежи и переводы на Дэйли витринах",
    employees: "Все сотрудники подразделения (34)",
  },
  {
    id: 8, status: "done", dates: "15.11.2026 – 20.11.2026", campaign: "Performance review",
    name: "Артёмов Александр", role: "Ведущий системный аналитик",
    division: "Стрим Платежи и переводы на Дэйли витринах",
    employees: "Коновалов А., Артюхова Б.",
  },
];

const BY_ME_ACTIVE_COUNT = BY_ME_ACTIVE.length;
const BY_ME_DONE_COUNT = BY_ME_DONE.length;

const TO_ME_ACTIVE = [
  {
    id: 9, status: "assigned", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Заковыркина Марина", role: "Аналитик",
    manager: "Жуков В. В.", dept: "Центр развития портальных компетенций",
    topics: ["План развития компетенций", "Карьерные планы, перспективы", "Карьерные планы, перспективы", "Карьерные планы, перспективы", "Карьерные планы, перспективы", "Карьерные планы, перспективы"],
    hasResults: false,
  },
  {
    id: 10, status: "conducted", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Глаголев Егор", role: "Аналитик",
    manager: "Жуков В. В.", dept: "Центр развития портальных компетенций",
    topics: ["План развития компетенций", "Карьерные планы, перспективы"],
    hasResults: true,
    results: {
      agreements: [{ tag: "Обучение", deadline: "до 01.03.2027", description: "Записать сотрудника на курс по системному анализу данных", responsible: "Руководитель" }],
      managerRating: "Эффективно",
      managerComment: "Егор показал хорошую динамику за последний квартал. Цели выполнены в срок, инициативность выросла. Рекомендую дать более сложные задачи для дальнейшего роста",
      employeeRating: "Эффективно",
      employeeComment: "Встреча прошла продуктивно. Обсудили план развития на следующий квартал, договорились о повышении ответственности на проекте. Рад что руководитель замечает мои успехи",
    },
  },
  {
    id: 11, status: "conducted", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Иванченко Фёдор", role: "Аналитик",
    manager: "Жуков В. В.", dept: "Центр развития портальных компетенций",
    topics: ["План развития компетенций", "Карьерные планы, перспективы"],
    hasResults: true,
    results: {
      agreements: [{ tag: "Повышение оплаты", deadline: "до 10.10.2024", description: "Повысить сотруднику оклад на 10% в следующем квартале", responsible: "Руководитель" }],
      managerRating: "Скорее эффективно",
      managerComment: "Нужно согласовать ставку, а также подготовить квартальный отчёт. Сотрудник хорошо справляется, но проседает мотивация. Нужна качественная обратная связь и реалистичное описание перспектив",
      employeeRating: "Скорее эффективно",
      employeeComment: "Договорились чаще проводить ретро, отслеживать мой прогресс по целям, которые были назначены. Мне было комфортно обсуждать с руководителем собственные пожелания и точки роста. К критике отнёсся с пониманием и терпением, работаем дальше!",
    },
  },
];

const TO_ME_DONE = [
  {
    id: 12, status: "cancelled", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Иванова Ирина", role: "Специалист по адаптации",
    manager: "Жуков В. В.", dept: "Центр развития портальных компетенций",
    topics: ["План развития компетенций", "Карьерные планы, перспективы"],
    cancelComment: "Высокая нагрузка по основным проектам, не смогу провести встречи качественно",
  },
  {
    id: 13, status: "done", dates: "15.11.2026 – 20.11.2026", campaign: "One-on-one",
    name: "Захаров Кирилл", role: "Ведущий специалист по адаптации",
    manager: "Жуков В. В.", dept: "Центр развития портальных компетенций",
    topics: ["План развития компетенций", "Карьерные планы, перспективы"],
    hasResults: false,
  },
];

function EarlyEndModal({ onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onCancel}>
      <div style={{ width: 480, background: "#fff", borderRadius: 32, paddingTop: 32, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }} onClick={e => e.stopPropagation()}>
        <div style={{ alignSelf: "stretch", paddingLeft: 16, paddingRight: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ alignSelf: "stretch", textAlign: "center", color: "#1D2023", fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px" }}>Завершить делегирование досрочно?</div>
          <div style={{ alignSelf: "stretch", textAlign: "center", color: "#626C77", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: "24px" }}>Восстановить его не получится. Все встречи вернутся к вам, а делегат получит уведомление</div>
        </div>
        <div style={{ alignSelf: "stretch", paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onConfirm} style={{ flex: 1, height: 52, padding: 14, background: "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", color: "#D8400C", fontSize: 12, fontFamily: "'MTSWide', sans-serif", fontWeight: 700, textTransform: "uppercase", lineHeight: "16px", letterSpacing: 0.6 }}>ЗАВЕРШИТЬ</button>
            <button onClick={onCancel} style={{ flex: 1, height: 52, padding: 14, background: "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", color: "#1D2023", fontSize: 12, fontFamily: "'MTSWide', sans-serif", fontWeight: 700, textTransform: "uppercase", lineHeight: "16px", letterSpacing: 0.6 }}>ОТМЕНА</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardDetailModal({ item, onClose, onEdit, onEarlyEnd }) {
  const isActive = item.status === "active" || item.status === "planned";
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ width: 744, maxHeight: "90vh", background: "#fff", borderRadius: 32, boxShadow: "0px 8px 16px rgba(0,0,0,0.08), 0px 4px 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", overflow: "hidden" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: 32, display: "flex", alignItems: "flex-start", gap: 8, flexShrink: 0 }}>
          <div style={{ flex: 1, paddingTop: 4, paddingBottom: 4, color: "#1D2023", fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px" }}>Информация о делегировании</div>
          <button onClick={onClose} style={{ padding: 4, background: "#F2F3F7", border: "none", borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#1D2023" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", paddingLeft: 32, paddingRight: 32, paddingBottom: 32 }}>

          {/* Status */}
          <div style={{ paddingBottom: 8 }}>
            <StatusBadge type={item.status} />
          </div>

          {/* Delegate */}
          <div style={{ paddingTop: 10, paddingBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <PersonAvatar src={AVATARS[item.name]} />
            <div>
              <div style={{ color: "#1D2023", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>{item.name}</div>
              <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>{item.role}</div>
            </div>
          </div>

          {/* Campaign */}
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>Кампания</div>
            <div style={{ color: "#1D2023", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>{item.campaign} {item.dates}</div>
          </div>

          {/* Division */}
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>Подразделение</div>
            <div style={{ color: "#1D2023", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>{item.division}</div>
          </div>

          {/* Campaign-level rejection banner */}
          {item.rejectionReason && (
            <div style={{ minHeight: 44, padding: 12, background: "#F2F3F7", borderRadius: 16, display: "flex", gap: 8, marginTop: 8, marginBottom: 4 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="10" cy="10" r="10" fill="#F95721"/>
                <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#1D2023", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>Делегат отказался от кампании</div>
                <div style={{ color: "#626C77", fontSize: 12, fontFamily: "'MTSCompact', sans-serif", lineHeight: "16px" }}>Причина отказа: {item.rejectionReason}</div>
              </div>
            </div>
          )}

          {/* Employees */}
          {item.employeeDetails && (
            <div>
              <div style={{ paddingTop: 20, paddingBottom: 8, display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 500, textTransform: "uppercase", lineHeight: "20px" }}>Сотрудники</div>
                <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>{item.employeeDetails.length}</div>
              </div>
              {item.employeeDetails.map((emp, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: 1, background: "rgba(188,195,208,0.5)" }} />}
                  <div style={{ paddingTop: 10, paddingBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                    <PersonAvatar src={AVATARS[emp.name]} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#1D2023", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", lineHeight: "24px" }}>{emp.name}</div>
                      <div style={{ color: "#626C77", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>{emp.role}</div>
                    </div>
                    <StatusBadge type={emp.status} />
                  </div>
                  {emp.declineReason && (
                    <div style={{ minHeight: 44, padding: 12, background: "#F2F3F7", borderRadius: 16, display: "flex", gap: 8, marginBottom: 10 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                        <circle cx="10" cy="10" r="10" fill="#F95721"/>
                        <path d="M10 6v5M10 14h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#1D2023", fontSize: 14, fontFamily: "'MTSCompact', sans-serif", lineHeight: "20px" }}>Делегат отказался от встречи</div>
                        <div style={{ color: "#626C77", fontSize: 12, fontFamily: "'MTSCompact', sans-serif", lineHeight: "16px" }}>Причина отказа: {emp.declineReason}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          {isActive && (
            <div style={{ paddingTop: 24, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={onEarlyEnd} style={{ height: 44, padding: "0 20px", background: "#F2F3F7", color: "#D8400C", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>ЗАВЕРШИТЬ ДОСРОЧНО</button>
              <button onClick={() => { onClose(); onEdit(item); }} style={{ height: 44, padding: "0 20px", background: "#F2F3F7", color: "#1D2023", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>РЕДАКТИРОВАТЬ</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ByMeCard({ item, onSelect }) {
  return (
    <div onClick={onSelect} style={{ background: "#fff", borderRadius: 32, outline: "1px solid rgba(188,195,208,0.5)", outlineOffset: -1, padding: "32px", flex: "1 1 0", minWidth: 0, cursor: "pointer" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <StatusBadge type={item.status} />
          <span style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{item.dates} ・ {item.campaign}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
          <PersonAvatar src={AVATARS[item.name]} />
          <div>
            <div style={{ fontSize: 17, color: "#1D2023", lineHeight: "24px" }}>{item.name}</div>
            <div style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{item.role}</div>
          </div>
        </div>
        <Tag label={item.division} />
        <div style={{ paddingTop: 10 }}>
          <div style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>Сотрудники</div>
          <div style={{ fontSize: 17, color: "#1D2023", lineHeight: "24px" }}>{item.employees}</div>
        </div>
      </div>
    </div>
  );
}

// ── Card: to-me ───────────────────────────────────────────────────────

function ToMeCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ background: "#fff", borderRadius: 32, outline: "1px solid rgba(188,195,208,0.5)", outlineOffset: -1, padding: "32px", width: "100%" }}>
      {/* Header row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <StatusBadge type={item.status} />
          <span style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{item.dates} ・ {item.campaign}</span>
        </div>

        {/* Person + manager + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Person */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
            <PersonAvatar src={AVATARS[item.name]} />
            <div>
              <div style={{ fontSize: 17, color: "#1D2023", lineHeight: "24px" }}>{item.name}</div>
              <div style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{item.role}</div>
            </div>
          </div>
          {/* Manager */}
          <div style={{ flex: 1, padding: "10px 0" }}>
            <div style={{ fontSize: 17, color: "#1D2023", lineHeight: "24px" }}>Руководитель: {item.manager}</div>
            <div style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{item.dept}</div>
          </div>
          {/* Actions */}
          <div style={{ width: 278, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
            {item.status === "assigned" && (
              <>
                <button style={{ height: 44, padding: "0 16px", background: "#0066FF", color: "#fff", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>ДОБАВИТЬ ИТОГИ</button>
                <button style={{ height: 44, padding: "0 16px", background: "#F2F3F7", color: "#D8400C", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>ОТКАЗ</button>
              </>
            )}
            {(item.status === "conducted" || item.status === "done") && (
              <>
                <div ref={menuRef} style={{ position: "relative" }}>
                  <button onClick={() => setShowMenu(v => !v)} style={{ width: 44, height: 44, background: showMenu ? "#E8E9EF" : "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
                      <path d="M0.0180118 1.53841C0.0612773 0.957075 0.08291 0.666409 0.37466 0.37466C0.666409 0.08291 0.957075 0.0612773 1.53841 0.0180118C1.6891 0.00679629 1.84455 0 2 0C2.15545 0 2.3109 0.00679629 2.46159 0.0180118C3.04293 0.0612773 3.33359 0.08291 3.62534 0.37466C3.91709 0.666409 3.93872 0.957075 3.98199 1.53841C3.9932 1.6891 4 1.84455 4 2C4 2.15545 3.9932 2.3109 3.98199 2.46159C3.93872 3.04293 3.91709 3.33359 3.62534 3.62534C3.33359 3.91709 3.04293 3.93872 2.46159 3.98199C2.3109 3.9932 2.15545 4 2 4C1.84455 4 1.6891 3.9932 1.53841 3.98199C0.957075 3.93872 0.666409 3.91709 0.37466 3.62534C0.08291 3.33359 0.0612773 3.04293 0.0180118 2.46159C0.00679629 2.3109 0 2.15545 0 2C0 1.84455 0.00679629 1.6891 0.0180118 1.53841Z" fill="#1D2023"/>
                      <path d="M7.01801 1.53841C7.06128 0.957075 7.08291 0.666409 7.37466 0.37466C7.66641 0.08291 7.95707 0.0612773 8.53841 0.0180118C8.6891 0.00679629 8.84455 0 9 0C9.15545 0 9.3109 0.00679629 9.46159 0.0180118C10.0429 0.0612773 10.3336 0.08291 10.6253 0.37466C10.9171 0.666409 10.9387 0.957075 10.982 1.53841C10.9932 1.6891 11 1.84455 11 2C11 2.15545 10.9932 2.3109 10.982 2.46159C10.9387 3.04293 10.9171 3.33359 10.6253 3.62534C10.3336 3.91709 10.0429 3.93872 9.46159 3.98199C9.3109 3.9932 9.15545 4 9 4C8.84455 4 8.6891 3.9932 8.53841 3.98199C7.95707 3.93872 7.66641 3.91709 7.37466 3.62534C7.08291 3.33359 7.06128 3.04293 7.01801 2.46159C7.0068 2.3109 7 2.15545 7 2C7 1.84455 7.0068 1.6891 7.01801 1.53841Z" fill="#1D2023"/>
                      <path d="M14.3747 0.37466C14.0829 0.666409 14.0613 0.957075 14.018 1.53841C14.0068 1.6891 14 1.84455 14 2C14 2.15545 14.0068 2.3109 14.018 2.46159C14.0613 3.04293 14.0829 3.33359 14.3747 3.62534C14.6664 3.91709 14.9571 3.93872 15.5384 3.98199C15.6891 3.9932 15.8446 4 16 4C16.1554 4 16.3109 3.9932 16.4616 3.98199C17.0429 3.93872 17.3336 3.91709 17.6253 3.62534C17.9171 3.33359 17.9387 3.04293 17.982 2.46159C17.9932 2.3109 18 2.15545 18 2C18 1.84455 17.9932 1.6891 17.982 1.53841C17.9387 0.957075 17.9171 0.666409 17.6253 0.37466C17.3336 0.08291 17.0429 0.0612773 16.4616 0.0180118C16.3109 0.00679629 16.1554 0 16 0C15.8446 0 15.6891 0.00679629 15.5384 0.0180118C14.9571 0.0612773 14.6664 0.08291 14.3747 0.37466Z" fill="#1D2023"/>
                    </svg>
                  </button>
                  {showMenu && (
                    <div style={{ position: "absolute", right: 0, top: 52, zIndex: 200, width: 220, padding: 6, background: "#fff", boxShadow: "0px 12px 20px rgba(0,0,0,0.14), 0px 4px 24px rgba(0,0,0,0.12)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Редактировать итоги", color: "#1D2023" },
                        { label: "Отказаться от делегирования", color: "#000" },
                      ].map((item, i) => (
                        <div key={i} onClick={() => setShowMenu(false)} style={{ padding: "4px 6px", borderRadius: 12, cursor: "pointer", fontSize: 14, lineHeight: "20px", color: item.color, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#F2F3F7"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setExpanded(v => !v)} style={{ width: 44, height: 44, background: "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>
              </>
            )}
            {item.status === "cancelled" && (
              <>
                <div ref={menuRef} style={{ position: "relative" }}>
                  <button onClick={() => setShowMenu(v => !v)} style={{ width: 44, height: 44, background: showMenu ? "#E8E9EF" : "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
                      <path d="M0.0180118 1.53841C0.0612773 0.957075 0.08291 0.666409 0.37466 0.37466C0.666409 0.08291 0.957075 0.0612773 1.53841 0.0180118C1.6891 0.00679629 1.84455 0 2 0C2.15545 0 2.3109 0.00679629 2.46159 0.0180118C3.04293 0.0612773 3.33359 0.08291 3.62534 0.37466C3.91709 0.666409 3.93872 0.957075 3.98199 1.53841C3.9932 1.6891 4 1.84455 4 2C4 2.15545 3.9932 2.3109 3.98199 2.46159C3.93872 3.04293 3.91709 3.33359 3.62534 3.62534C3.33359 3.91709 3.04293 3.93872 2.46159 3.98199C2.3109 3.9932 2.15545 4 2 4C1.84455 4 1.6891 3.9932 1.53841 3.98199C0.957075 3.93872 0.666409 3.91709 0.37466 3.62534C0.08291 3.33359 0.0612773 3.04293 0.0180118 2.46159C0.00679629 2.3109 0 2.15545 0 2C0 1.84455 0.00679629 1.6891 0.0180118 1.53841Z" fill="#1D2023"/>
                      <path d="M7.01801 1.53841C7.06128 0.957075 7.08291 0.666409 7.37466 0.37466C7.66641 0.08291 7.95707 0.0612773 8.53841 0.0180118C8.6891 0.00679629 8.84455 0 9 0C9.15545 0 9.3109 0.00679629 9.46159 0.0180118C10.0429 0.0612773 10.3336 0.08291 10.6253 0.37466C10.9171 0.666409 10.9387 0.957075 10.982 1.53841C10.9932 1.6891 11 1.84455 11 2C11 2.15545 10.9932 2.3109 10.982 2.46159C10.9387 3.04293 10.9171 3.33359 10.6253 3.62534C10.3336 3.91709 10.0429 3.93872 9.46159 3.98199C9.3109 3.9932 9.15545 4 9 4C8.84455 4 8.6891 3.9932 8.53841 3.98199C7.95707 3.93872 7.66641 3.91709 7.37466 3.62534C7.08291 3.33359 7.06128 3.04293 7.01801 2.46159C7.0068 2.3109 7 2.15545 7 2C7 1.84455 7.0068 1.6891 7.01801 1.53841Z" fill="#1D2023"/>
                      <path d="M14.3747 0.37466C14.0829 0.666409 14.0613 0.957075 14.018 1.53841C14.0068 1.6891 14 1.84455 14 2C14 2.15545 14.0068 2.3109 14.018 2.46159C14.0613 3.04293 14.0829 3.33359 14.3747 3.62534C14.6664 3.91709 14.9571 3.93872 15.5384 3.98199C15.6891 3.9932 15.8446 4 16 4C16.1554 4 16.3109 3.9932 16.4616 3.98199C17.0429 3.93872 17.3336 3.91709 17.6253 3.62534C17.9171 3.33359 17.9387 3.04293 17.982 2.46159C17.9932 2.3109 18 2.15545 18 2C18 1.84455 17.9932 1.6891 17.982 1.53841C17.9387 0.957075 17.9171 0.666409 17.6253 0.37466C17.3336 0.08291 17.0429 0.0612773 16.4616 0.0180118C16.3109 0.00679629 16.1554 0 16 0C15.8446 0 15.6891 0.00679629 15.5384 0.0180118C14.9571 0.0612773 14.6664 0.08291 14.3747 0.37466Z" fill="#1D2023"/>
                    </svg>
                  </button>
                  {showMenu && (
                    <div style={{ position: "absolute", right: 0, top: 52, zIndex: 200, width: 220, padding: 6, background: "#fff", boxShadow: "0px 12px 20px rgba(0,0,0,0.14), 0px 4px 24px rgba(0,0,0,0.12)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Редактировать итоги", color: "#1D2023" },
                        { label: "Отказаться от делегирования", color: "#000" },
                      ].map((item, i) => (
                        <div key={i} onClick={() => setShowMenu(false)} style={{ padding: "4px 6px", borderRadius: 12, cursor: "pointer", fontSize: 14, lineHeight: "20px", color: item.color, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400 }}
                          onMouseEnter={e => e.currentTarget.style.background = "#F2F3F7"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setExpanded(v => !v)} style={{ width: 44, height: 44, background: "#F2F3F7", border: "none", borderRadius: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Topics */}
        <div style={{ paddingTop: 10 }}>
          <div style={{ fontSize: 17, color: "#1D2023", lineHeight: "24px", marginBottom: 12 }}>Темы для обсуждения:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {item.topics.map((t, i) => <Tag key={i} label={t} />)}
          </div>
        </div>
      </div>

      {/* Expanded: cancelled */}
      {expanded && item.status === "cancelled" && item.cancelComment && (
        <div style={{ marginTop: 32 }}>
          <div style={{ height: 1, background: "rgba(188,195,208,0.5)", marginBottom: 32 }} />
          <div style={{ fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px", color: "#1D2023", marginBottom: 16 }}>Встреча отменена</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#1D2023", lineHeight: "20px" }}>Комментарий:</div>
            <div style={{ fontSize: 14, color: "#1D2023", lineHeight: "20px" }}>{item.cancelComment}</div>
          </div>
        </div>
      )}

      {/* Expanded: results */}
      {expanded && item.hasResults && item.results && (
        <div style={{ marginTop: 32 }}>
          <div style={{ height: 1, background: "rgba(188,195,208,0.5)", marginBottom: 32 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {/* Agreements */}
            <div>
              <div style={{ fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px", color: "#1D2023", marginBottom: 32 }}>Итоги встречи от руководителя</div>
              <div style={{ fontSize: 17, fontWeight: 500, color: "#1D2023", lineHeight: "24px", marginBottom: 16 }}>Договорённости</div>
              {item.results.agreements.map((a, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag label={a.tag} />
                    <span style={{ fontSize: 14, color: "#626C77", lineHeight: "20px" }}>{a.deadline}</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#1D2023", lineHeight: "20px" }}>{a.description}</div>
                  <div style={{ fontSize: 14, color: "#1D2023", lineHeight: "20px" }}>Ответственный: {a.responsible}</div>
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div>
              <div style={{ fontSize: 20, fontFamily: "'MTSWide', sans-serif", fontWeight: 500, lineHeight: "24px", color: "#1D2023", marginBottom: 32 }}>Оценка встречи</div>
              <div style={{ display: "flex", gap: 32 }}>
                {[
                  { title: "Руководитель", rating: item.results.managerRating, comment: item.results.managerComment },
                  { title: "Сотрудник",    rating: item.results.employeeRating, comment: item.results.employeeComment },
                ].map((r, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 500, color: "#1D2023", lineHeight: "24px", marginBottom: 16 }}>{r.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0066FF", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15.5 11C15.8978 11 16.2794 10.842 16.5607 10.5607C16.842 10.2794 17 9.89782 17 9.5C17 9.10218 16.842 8.72064 16.5607 8.43934C16.2794 8.15804 15.8978 8 15.5 8C15.1022 8 14.7206 8.15804 14.4393 8.43934C14.158 8.72064 14 9.10218 14 9.5C14 9.89782 14.158 10.2794 14.4393 10.5607C14.7206 10.842 15.1022 11 15.5 11ZM10 9.5C10 9.89782 9.84196 10.2794 9.56066 10.5607C9.27936 10.842 8.89782 11 8.5 11C8.10218 11 7.72064 10.842 7.43934 10.5607C7.15804 10.2794 7 9.89782 7 9.5C7 9.10218 7.15804 8.72064 7.43934 8.43934C7.72064 8.15804 8.10218 8 8.5 8C8.89782 8 9.27936 8.15804 9.56066 8.43934C9.84196 8.72064 10 9.10218 10 9.5ZM6.328 15.13C6.49192 15.0184 6.69335 14.9763 6.88825 15.0128C7.08314 15.0494 7.25564 15.1616 7.368 15.325L7.377 15.337L7.421 15.396C7.463 15.45 7.531 15.532 7.624 15.634C7.811 15.837 8.096 16.114 8.482 16.391C9.25 16.944 10.412 17.5 12 17.5C13.588 17.5 14.75 16.944 15.518 16.391C15.904 16.114 16.19 15.837 16.376 15.634C16.4634 15.5391 16.5462 15.4399 16.624 15.337L16.631 15.327C16.7431 15.1626 16.9158 15.0494 17.1113 15.0123C17.3069 14.9753 17.5091 15.0174 17.6735 15.1295C17.8379 15.2416 17.9511 15.4143 17.9882 15.6098C18.0252 15.8054 17.9831 16.0076 17.871 16.172L17.869 16.173V16.175L17.866 16.178L17.859 16.188L17.837 16.219L17.761 16.319C17.6716 16.432 17.5783 16.5417 17.481 16.648C17.1529 17.0048 16.7886 17.3265 16.394 17.608C15.424 18.307 13.962 19 12 19C10.038 19 8.576 18.306 7.606 17.609C7.21096 17.3269 6.84633 17.0045 6.518 16.647C6.3852 16.5006 6.25971 16.3478 6.142 16.189L6.134 16.179L6.132 16.175L6.131 16.173L6.13 16.172C6.01808 16.0076 5.97607 15.8054 6.0132 15.61C6.05033 15.4146 6.16357 15.2419 6.328 15.13ZM12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.201 22.5 1.5 17.799 1.5 12Z" fill="#FAFAFA"/>
                      </svg>
                    </div>
                      <span style={{ fontSize: 14, color: "#1D2023", lineHeight: "20px" }}>{r.rating}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#1D2023", lineHeight: "20px", marginBottom: 2 }}>Комментарий</div>
                    <div style={{ fontSize: 14, color: "#1D2023", lineHeight: "20px" }}>{r.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────

export default function DelegationList({ onNavigate, toast, onToastDone }) {
  const [tab, setTab] = useState("byMe");
  const [filter, setFilter] = useState("active");
  const [selectedCard, setSelectedCard] = useState(null);
  const [earlyEndItem, setEarlyEndItem] = useState(null);
  const [earlyEndToast, setEarlyEndToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onToastDone && onToastDone(), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!earlyEndToast) return;
    const t = setTimeout(() => setEarlyEndToast(false), 3000);
    return () => clearTimeout(t);
  }, [earlyEndToast]);

  const isByMe = tab === "byMe";
  const isActive = filter === "active";

  const byMeCards = isActive ? BY_ME_ACTIVE : BY_ME_DONE;
  const toMeCards = isActive ? TO_ME_ACTIVE : TO_ME_DONE;

  const searchPlaceholder = isByMe ? "Поиск по делегату" : "Поиск по сотруднику";

  const crumbs = ["Пульс", "Мои документы", "Талант-ревью", "Делегирование"];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'MTSCompact', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }${FONT_CSS}`}</style>
      <Header />
      <div style={{ padding: "0 88px 88px" }}>

        {/* Breadcrumbs */}
        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 14, lineHeight: "20px", color: i === crumbs.length - 1 ? "#1D2023" : "#626C77", cursor: i < crumbs.length - 1 ? "pointer" : "default" }}>{c}</span>
              {i < crumbs.length - 1 && <BreadChevron />}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: "36px", fontFamily: "'MTSWide', sans-serif", color: "#1D2023", margin: "36px 0 0" }}>
          Делегирование
        </h1>

        {/* Tabs */}
        <div style={{ paddingTop: 12 }}>
          <Tabs
            tabs={[
              { key: "byMe", label: "Делегированы мною", count: BY_ME_ACTIVE_COUNT },
              { key: "toMe", label: "Делегированы мне",  count: TO_ME_ACTIVE.length },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {/* Filter + actions row */}
        <div style={{ paddingTop: 20, paddingBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Choice chips */}
            <Chip active={filter === "active"} onClick={() => setFilter("active")}>Активные</Chip>
            <Chip active={filter === "done"} onClick={() => setFilter("done")}>Завершенные</Chip>
            {/* Search */}
            <div style={{ width: 400, height: 44, background: "#F2F3F7", borderRadius: 16, border: "1px solid rgba(188,195,208,0.5)", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
              <SearchIcon />
              <span style={{ fontSize: 17, color: "#626C77", lineHeight: "24px" }}>{searchPlaceholder}</span>
            </div>
          </div>

          {/* Right button */}
          {isByMe ? (
            <button
              onClick={() => onNavigate && onNavigate("form")}
              style={{ height: 44, padding: "0 24px", background: "#0066FF", color: "#fff", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}
            >
              НАЗНАЧИТЬ ДЕЛЕГИРОВАНИЕ
            </button>
          ) : (
            <button style={{ height: 44, padding: "0 24px", background: "#F2F3F7", color: "#1D2023", border: "none", borderRadius: 16, cursor: "pointer", ...BTN_STYLE }}>
              ОТКЛОНИТЬ КАМПАНИИ
            </button>
          )}
        </div>

        {/* Cards */}
        {isByMe ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* 2-column grid */}
            {Array.from({ length: Math.ceil(byMeCards.length / 2) }).map((_, row) => (
              <div key={row} style={{ display: "flex", gap: 32 }}>
                {byMeCards.slice(row * 2, row * 2 + 2).map(item => (
                  <ByMeCard key={item.id} item={item} onSelect={() => setSelectedCard(item)} />
                ))}
                {byMeCards.slice(row * 2, row * 2 + 2).length === 1 && <div style={{ flex: "1 1 0" }} />}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {toMeCards.map(item => (
              <ToMeCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {selectedCard && !earlyEndItem && (
        <CardDetailModal
          item={selectedCard}
          onClose={() => setSelectedCard(null)}
          onEdit={(item) => { setSelectedCard(null); onNavigate("edit", false, item); }}
          onEarlyEnd={() => { setEarlyEndItem(selectedCard); setSelectedCard(null); }}
        />
      )}

      {earlyEndItem && (
        <EarlyEndModal
          onConfirm={() => { setEarlyEndItem(null); setEarlyEndToast(true); }}
          onCancel={() => setEarlyEndItem(null)}
        />
      )}

      {(toast || earlyEndToast) && (
        <div style={{ position: "fixed", bottom: 36, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 600, pointerEvents: "none" }}>
          <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: "#1D2023", borderRadius: 16, display: "inline-flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 20, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="#45B6FC"/>
                <rect x="11" y="10" width="2" height="6" rx="1" fill="#1D2023"/>
                <rect x="11" y="7" width="2" height="2" rx="1" fill="#1D2023"/>
              </svg>
            </div>
            <div style={{ color: "#FAFAFA", fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: "24px" }}>{earlyEndToast ? "Делегирование успешно завершено" : "Изменения сохранены"}</div>
          </div>
        </div>
      )}
    </div>
  );
}

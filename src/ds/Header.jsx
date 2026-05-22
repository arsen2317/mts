import { useState } from "react";
import { FONT_CSS } from "./fonts";

const LogoSVG = ({ width = 208, height = 44 }) => (
  <svg width={width} height={height} viewBox="0 0 208 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M72.1523 18.8618C74.6518 18.657 76.6584 18.8618 78.9435 20.1131V17.1339C77.1535 16.3146 74.3954 15.8948 72.1523 16.0226C68.2274 16.2457 64.1367 18.438 64.1367 21.9991C64.1367 25.5603 68.2274 27.7526 72.1523 27.9757C74.3976 28.1034 77.1535 27.6836 78.9435 26.8643V23.8831C76.6584 25.1364 74.6518 25.3392 72.1523 25.1344C69.9357 24.9539 67.4517 24.1083 67.4517 21.9971C67.4517 19.8859 69.9357 19.0423 72.1523 18.8618Z" fill="#0066FF"/>
    <path d="M61.001 19.7114C60.3778 19.3991 59.6662 19.2227 58.9082 19.2227H52.002V16.3125H48.9766V27.6713H58.8529H58.9082C59.6662 27.6713 60.3778 27.4929 61.001 27.1826C62.4618 26.4748 63.4563 25.0674 63.4563 23.447C63.4563 21.8266 62.4618 20.4192 61.001 19.7114ZM58.8529 24.895H52.002V21.999H58.8529C59.7237 21.999 60.4308 22.648 60.4308 23.447C60.4308 24.2461 59.7259 24.895 58.8529 24.895Z" fill="#0066FF"/>
    <path d="M30.6328 27.718V24.8788C33.2936 24.8788 33.5301 24.1751 33.6428 23.8364C34.213 22.1308 35.1677 17.5151 35.1765 17.4685L35.4152 16.3125H46.7214V27.6774H43.6275V19.1537H37.9699C37.6362 20.693 37.0351 23.3659 36.5975 24.6699C35.687 27.4037 32.6328 27.718 30.6328 27.718Z" fill="#0066FF"/>
    <path d="M14.756 27.6366H11.7283V19.0987H3.02987V27.6366H0V16.3203H14.756V27.6366Z" fill="#0066FF"/>
    <path d="M33.2178 16.3203H29.5514L24.6033 24.2579L19.432 16.3203H15.7656L22.7712 26.9288L20.2033 30.999H23.8696L33.2178 16.3203Z" fill="#0066FF"/>
    <rect width="1" height="18" transform="translate(87.9453 13)" fill="#BCC3D0" fillOpacity="0.5"/>
    <g clipPath="url(#clip0_10120_97401)">
      <path d="M104.361 13C105.696 13 107.284 14.2902 108.605 16.4589C109.963 18.7052 110.777 21.4855 110.777 23.9001C110.777 27.4352 108.792 31 104.361 31C99.9261 31 97.9453 27.4352 97.9453 23.9001C97.9453 21.4854 98.76 18.7052 100.125 16.4589C101.435 14.2901 103.022 13 104.361 13ZM126.655 23.5572L129.22 13.9644H137.723V30.0356H132.911V16.9551L129.413 30.0356H123.896L120.401 16.9631V30.0356H115.589V13.9644H124.09L126.655 23.5572ZM152.801 18.3038H148.31V30.0356H143.498V18.3038H139.007V13.9644H152.801V18.3038ZM170.124 18.3038H163.066C160.065 18.3038 158.091 19.3784 158.091 22C158.091 24.6216 160.065 25.6962 163.066 25.6962H170.124V30.0356H163.066C156.581 30.0354 153.12 26.8053 153.12 22C153.12 17.1947 156.581 13.9645 163.066 13.9644H170.124V18.3038ZM181.397 15.886H177.202V16.9343H179.329C181.107 16.9344 181.967 17.8191 181.967 19.3793C181.967 21.0213 181.107 21.9999 179.329 22H174.935V13.9644H181.397V15.886ZM190.637 22H188.184L187.72 20.4627H184.884L184.43 22H182.315L184.791 13.9644H188.161L190.637 22ZM193.775 16.9103H196.367V13.9644H198.691V22H196.367V18.8903H193.775V22H191.45V13.9644H193.775V16.9103ZM202.409 16.9103H202.817L204.897 13.9644H207.349L204.675 17.7956L207.582 22H204.897L202.746 18.8903H202.409V22H200.085V13.9644H202.409V16.9103ZM177.202 20.1951H178.899C179.329 20.195 179.584 19.9738 179.584 19.5662V19.2746C179.584 18.8555 179.364 18.6227 178.899 18.6226H177.202V20.1951ZM185.406 18.7161H187.197L186.302 15.7462L185.406 18.7161Z" fill="#E30611"/>
    </g>
    <defs>
      <clipPath id="clip0_10120_97401">
        <rect width="109.636" height="18" fill="white" transform="translate(97.9453 13)"/>
      </clipPath>
    </defs>
  </svg>
);

const BurgerLines = ({ color = '#292929' }) => (
  <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
    <div style={{ width: 16, height: 1.5, left: 4, top: 6, position: 'absolute', background: color }} />
    <div style={{ width: 16, height: 1.5, left: 4, top: 11, position: 'absolute', background: color }} />
    <div style={{ width: 16, height: 1.5, left: 4, top: 16, position: 'absolute', background: color }} />
  </div>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 4l4 4-4 4" stroke="#626C77" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
    <div style={{ width: 14, height: 18, left: 5, top: 3, position: 'absolute', background: '#292929',
      clipPath: 'polygon(2px 14px, 12px 14px, 14px 10px, 14px 6px, 10px 2px, 4px 2px, 0 6px, 0 10px)',
    }} />
    <div style={{ width: 6, height: 6, left: 16, top: 2, position: 'absolute', background: '#3385FF', borderRadius: '50%' }} />
  </div>
);

const NavIcon = () => (
  <div style={{ width: 24, height: 24, background: '#E8EDF2', borderRadius: 6, flexShrink: 0 }} />
);

const WorkRestIcon = () => (
  <div style={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
    <div style={{ width: 20, height: 18, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 7.55, height: 8.77, left: 2.28, top: 2.42, position: 'absolute', background: '#1991EF' }} />
      <div style={{ width: 9.77, height: 5.07, left: 0.05, top: 12.09, position: 'absolute', background: '#1991EF' }} />
      <div style={{ width: 6.67, height: 2.09, left: 3.14, top: 12.69, position: 'absolute', background: '#006FC2' }} />
      <div style={{ width: 9.76, height: 2.27, left: 0.05, top: 14.90, position: 'absolute', background: '#006FC2' }} />
      <div style={{ width: 5.15, height: 9.63, left: 10.66, top: 4.16, position: 'absolute', background: '#FFA800' }} />
      <div style={{ width: 3, height: 2.99, left: 14.73, top: 2.28, position: 'absolute', background: '#FFA800' }} />
      <div style={{ width: 3.26, height: 1.13, left: 16.72, top: 8.37, position: 'absolute', background: '#FFA800' }} />
      <div style={{ width: 2.99, height: 2.97, left: 14.73, top: 12.66, position: 'absolute', background: '#FFA800' }} />
      <div style={{ width: 1.12, height: 3.28, left: 10.66, top: 14.66, position: 'absolute', background: '#FFA800' }} />
    </div>
  </div>
);

const TalentReviewIcon = () => (
  <div style={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
    <div style={{ width: 20, height: 20, position: 'relative' }}>
      <div style={{ width: 17.28, height: 16.55, left: 1.36, top: 2.20, position: 'absolute', background: '#E5DFFF' }} />
      <div style={{ width: 6.67, height: 6.67, left: 6.66, top: 0, position: 'absolute', background: '#8F8FFF', borderRadius: 9999 }} />
      <div style={{ width: 6.67, height: 6.67, left: 0, top: 13.34, position: 'absolute', background: '#8F8FFF', borderRadius: 9999 }} />
      <div style={{ width: 6.67, height: 6.67, left: 13.34, top: 13.34, position: 'absolute', background: '#8F8FFF', borderRadius: 9999 }} />
    </div>
  </div>
);

const RitmIcon = () => (
  <div style={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
    <div style={{ width: 18, height: 18, position: 'relative' }}>
      <div style={{ width: 4, height: 4, left: 7, top: 0, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 7, top: 14, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 12, top: 2, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 12, top: 12, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 2, top: 2, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 2, top: 12, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 14, top: 7, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 0, top: 7, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 8, height: 8, left: 5, top: 5, position: 'absolute', background: '#F00085', borderRadius: 9999 }} />
      <div style={{ width: 4, height: 4, left: 7, top: 7, position: 'absolute', background: '#FFCB54', borderRadius: 9999 }} />
    </div>
  </div>
);

const FAVORITES = [
  { label: 'работа и отдых', icon: <WorkRestIcon /> },
  { label: 'делегирование', icon: <NavIcon /> },
];

const FREQUENT = [
  { label: 'пункт управления', icon: <NavIcon /> },
  { label: 'развитие', icon: <NavIcon /> },
  { label: 'полка', icon: <NavIcon /> },
  { label: 'сервисы', icon: <NavIcon /> },
  { label: 'корпоративная жизнь', icon: <NavIcon /> },
  { label: 'обращения и справки', icon: <NavIcon /> },
  { label: 'талант-ревью', icon: <TalentReviewIcon /> },
  { label: 'моя карьера', icon: <NavIcon /> },
  { label: 'мой доход', icon: <NavIcon /> },
  { label: 'цели', icon: <NavIcon /> },
  { label: 'задачи', icon: <NavIcon /> },
  { label: 'обратная связь', icon: <NavIcon /> },
  { label: 'так принято в МТС\nФинтех', icon: <NavIcon /> },
  { label: 'кибербезопасность', icon: <NavIcon /> },
  { label: 'ритм', icon: <RitmIcon /> },
  { label: 'оценка', icon: <NavIcon /> },
  { label: 'структура', icon: <NavIcon /> },
  { label: 'тесты, опросы, 360', icon: <NavIcon /> },
];

const SECTION_LABEL = { color: '#626C77', fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '18px' };
const NAV_ITEM_TEXT = { color: '#1D2023', fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' };

function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: 280, height: '100vh',
        background: '#F8F8F8',
        zIndex: 201,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
      }}>
        {/* Sidebar header: burger + logo */}
        <div style={{ paddingTop: 24, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <div onClick={onClose} style={{ cursor: 'pointer', height: 24, display: 'flex', alignItems: 'center', paddingRight: 16, flexShrink: 0 }}>
            <BurgerLines color="#1D2023" />
          </div>
          <LogoSVG width={142} height={30} />
        </div>

        {/* User profile */}
        <div style={{ paddingBottom: 24, paddingLeft: 24, paddingRight: 24, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ paddingBottom: 7 }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: '#EDEDED', position: 'relative', overflow: 'hidden', outline: '1px solid #E3E3E3', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#A9AAAC', fontSize: 13.6, fontFamily: 'Helvetica', fontWeight: 700, lineHeight: '16px' }}>АА</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', color: '#1D2023', fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 500, lineHeight: '20px' }}>Иван Иванов</div>
          <div style={{ textAlign: 'center', color: '#626C77', fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>Продуктовый дизайнер</div>
        </div>

        {/* Scrollable nav */}
        <div className="modal-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* All apps row */}
          <div style={{ height: 40, display: 'flex', alignItems: 'center', paddingLeft: 24, gap: 8, flexShrink: 0, cursor: 'pointer' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 14, height: 14, background: '#8D969F' }} />
            </div>
            <span style={{ color: '#626C77', fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>все приложения</span>
          </div>

          {/* Favorites */}
          <div style={{ paddingLeft: 24, paddingRight: 24, ...SECTION_LABEL }}>избранные</div>
          <div style={{ paddingTop: 8, paddingLeft: 24, paddingRight: 16, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAVORITES.map(({ label, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                {icon}
                <span style={NAV_ITEM_TEXT}>{label}</span>
              </div>
            ))}
          </div>

          {/* Frequent */}
          <div style={{ paddingLeft: 24, paddingRight: 24, ...SECTION_LABEL }}>часто используемые</div>
          <div style={{ paddingTop: 8, paddingBottom: 24, paddingLeft: 24, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FREQUENT.map(({ label, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                {icon}
                <span style={{ ...NAV_ITEM_TEXT, whiteSpace: 'pre-line' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: support */}
        <div style={{ paddingTop: 17, paddingBottom: 16, paddingLeft: 24, paddingRight: 24, borderTop: '1px solid #CECECE', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ width: 16.93, height: 16.93, position: 'absolute', left: 3.53, top: 3.54, background: '#8D969F' }} />
          </div>
          <span style={{ color: '#626C77', fontSize: 17, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>поддержка</span>
        </div>
      </div>
    </>
  );
}

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', height: 72, paddingLeft: 88, paddingRight: 88, display: 'inline-flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>

            {/* Burger */}
            <div
              onClick={() => setSidebarOpen(true)}
              style={{ height: 24, paddingRight: 16, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <BurgerLines />
            </div>

            {/* Breadcrumbs */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <span style={{ color: '#626C77', fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>главная</span>
                <div style={{ display: 'flex', alignItems: 'center', height: 20 }}><ChevronRightIcon /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <span style={{ color: '#626C77', fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>талант-ревью</span>
                <div style={{ display: 'flex', alignItems: 'center', height: 20 }}><ChevronRightIcon /></div>
              </div>
              <span style={{ color: '#1D2023', fontSize: 14, fontFamily: "'MTSCompact', sans-serif", fontWeight: 400, lineHeight: '20px' }}>делегирования</span>
            </div>

            {/* Notifications */}
            <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ paddingLeft: 4, paddingRight: 8, display: 'flex', alignItems: 'center' }}>
                <BellIcon />
              </div>
              <span style={{ color: '#1D2023', fontSize: 14, fontFamily: 'Open Sans, sans-serif', fontWeight: 520, lineHeight: '20px', whiteSpace: 'nowrap' }}>уведомления раздела</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export { FONT_CSS };

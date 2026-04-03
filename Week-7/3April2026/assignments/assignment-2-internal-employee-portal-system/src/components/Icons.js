// Clean inline SVG icons (Lucide-style strokes, no fill)
const defaults = { width: 16, height: 16, stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

const Icon = ({ d, size = 16, ...rest }) => (
  <svg {...defaults} width={size} height={size} viewBox="0 0 24 24" {...rest}>
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

export const Building = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M3 21V7l9-4 9 4v14" />
    <path d="M3 21h18" />
    <rect x="9" y="13" width="6" height="8" />
    <path d="M9 9h.01M12 9h.01M15 9h.01M9 5h.01M12 5h.01M15 5h.01" />
  </svg>
);

export const LogOut = ({ size }) => (
  <Icon size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />
);

export const Check = ({ size }) => (
  <Icon size={size} d="M20 6L9 17l-5-5" />
);

export const X = ({ size }) => (
  <Icon size={size} d={["M18 6L6 18","M6 6l12 12"]} />
);

export const Info = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export const Lock = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const ClipboardList = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

export const BarChart = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M12 20V10M18 20V4M6 20v-4" />
  </svg>
);

export const Shield = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const Eye = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOff = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

export const Search = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export const Pencil = ({ size }) => (
  <Icon size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />
);

export const Trash = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export const AlertTriangle = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const UserX = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M18 8l4 4M22 8l-4 4" />
  </svg>
);

export const Ban = ({ size }) => (
  <svg {...defaults} width={size||16} height={size||16} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M4.93 4.93l14.14 14.14" />
  </svg>
);

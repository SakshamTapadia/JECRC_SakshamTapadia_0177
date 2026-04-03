import { useAuth } from "../context/AuthContext";
import { Check, X, Info } from "./Icons";

const ICONS = { success: <Check size={12} />, error: <X size={12} />, info: <Info size={12} /> };

export default function Alert() {
  const { alert } = useAuth();
  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type}`}>
      <span className="alert-icon">{ICONS[alert.type]}</span>
      <span>{alert.msg}</span>
    </div>
  );
}

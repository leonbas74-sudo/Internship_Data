import { useState, useMemo } from "react";
import { Terminal, Code2, User, Check, Moon, Bell } from "lucide-react";

const FONT_MONO = "'JetBrains Mono', 'Fira Code', monospace";

// Simple but reasonably strict email pattern: local@domain.tld
// Rejects obviously malformed input, accepts +tags and subdomains.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- Reusable primitives ---------- */

// Toggle: a controlled on/off switch. Purely presentational — the
// parent owns the boolean state, this component just renders it.
function Toggle({ id, checked, onChange, label }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative w-11 h-6 rounded-full transition-colors duration-150 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: checked ? "#34D399" : "#2A2E3A",
        outlineOffset: "2px",
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-150"
        style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

// FormField: label + input + inline error, wired up for accessibility.
// Reused for both Name and Email so validation UI stays consistent.
function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  placeholder,
  autoComplete,
}) {
  const errorId = `${id}-error`;
  const showError = touched && Boolean(error);

  return (
    <div className="py-4 first:pt-0 border-b" style={{ borderColor: "#242832" }}>
      <label
        htmlFor={id}
        style={{ fontFamily: FONT_MONO, color: "#F0B429" }}
        className="text-sm block mb-2"
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "#E24B4A" }}>
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        className="w-full rounded-md px-3 py-2 text-sm focus:outline-none focus-visible:ring-2"
        style={{
          backgroundColor: "#12141A",
          border: `1px solid ${showError ? "#E24B4A" : "#2A2E3A"}`,
          color: "#E8EAF0",
        }}
      />
      {showError && (
        <p
          id={errorId}
          role="alert"
          className="text-xs mt-2"
          style={{ color: "#F0A0A0", fontFamily: FONT_MONO }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ToggleRow: label + description + Toggle, laid out consistently.
function ToggleRow({ id, icon: Icon, title, description, checked, onChange }) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-4 first:pt-0 border-b last:border-b-0"
      style={{ borderColor: "#242832" }}
    >
      <div className="flex items-start gap-3 min-w-0">
        {Icon && <Icon size={16} color="#8A8FA3" className="mt-0.5 flex-shrink-0" aria-hidden="true" />}
        <div className="min-w-0">
          <label htmlFor={id} className="text-sm block" style={{ color: "#E8EAF0" }}>
            {title}
          </label>
          {description && (
            <p className="text-xs mt-0.5" style={{ color: "#6B7080" }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

// Section: card wrapper with a header, used to group related fields.
function Section({ icon: Icon, title, path, children }) {
  return (
    <section
      aria-labelledby={`${title}-heading`}
      className="rounded-lg border"
      style={{ backgroundColor: "#1B1E27", borderColor: "#2A2E3A" }}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: "#2A2E3A" }}>
        <Icon size={16} color="#F0B429" strokeWidth={2} aria-hidden="true" />
        <h2 id={`${title}-heading`} className="text-sm font-medium" style={{ color: "#E8EAF0" }}>
          {title}
        </h2>
        {path && (
          <span style={{ fontFamily: FONT_MONO, color: "#4A4F5E" }} className="text-xs ml-auto hidden sm:inline">
            {path}
          </span>
        )}
      </div>
      <div className="px-5">{children}</div>
    </section>
  );
}

/* ---------- Validation helpers (pure functions = easy to unit test) ---------- */

export function validateName(value) {
  if (!value.trim()) return "Name is required.";
  return "";
}

export function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
  return "";
}

/* ---------- Main component ---------- */

export default function SettingsPage({ onSave }) {
  // Profile fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false });

  // Preference toggles
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Saved-confirmation state (UI feedback only, not persistence)
  const [savedAt, setSavedAt] = useState(null);

  // Derived, not stored: recomputed from current values every render,
  // so it can never drift out of sync with name/email.
  const nameError = useMemo(() => validateName(name), [name]);
  const emailError = useMemo(() => validateEmail(email), [email]);
  const isFormValid = !nameError && !emailError;

  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSave = (e) => {
    e.preventDefault();
    // Guard clause: covers the case where Save is somehow triggered
    // (e.g. Enter key) before the disabled state has re-rendered.
    if (!isFormValid) {
      setTouched({ name: true, email: true });
      return;
    }
    const profile = { name: name.trim(), email: email.trim(), darkMode, notifications };
    onSave?.(profile);
    setSavedAt(new Date());
  };

  return (
    <div
      className="min-h-full w-full p-4 sm:p-6"
      style={{ backgroundColor: "#12141A", fontFamily: "'Inter', sans-serif" }}
    >
      <form onSubmit={handleSave} noValidate className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={18} color="#8A8FA3" aria-hidden="true" />
          <span style={{ fontFamily: FONT_MONO, color: "#E8EAF0" }} className="text-base">
            settings.py
          </span>
          <span style={{ fontFamily: FONT_MONO, color: "#4A4F5E" }} className="text-xs">
            — profile
          </span>
        </div>

        {/* Profile fields */}
        <Section icon={User} title="Profile" path="user_config">
          <FormField
            id="name"
            label="Name"
            value={name}
            onChange={setName}
            onBlur={() => markTouched("name")}
            error={nameError}
            touched={touched.name}
            required
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            onBlur={() => markTouched("email")}
            error={emailError}
            touched={touched.email}
            required
            placeholder="ada@example.com"
            autoComplete="email"
          />
        </Section>

        {/* Preferences */}
        <Section icon={Code2} title="Preferences" path="app_config">
          <ToggleRow
            id="dark-mode"
            icon={Moon}
            title="Dark mode"
            description="Use a dark color theme across the app."
            checked={darkMode}
            onChange={setDarkMode}
          />
          <ToggleRow
            id="notifications"
            icon={Bell}
            title="Notifications"
            description="Receive updates about your account."
            checked={notifications}
            onChange={setNotifications}
          />
        </Section>

        {/* Save action */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full sm:w-auto rounded-md px-4 py-2 text-sm font-medium transition-opacity focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: "#F0B429",
              color: "#1B1E27",
              opacity: isFormValid ? 1 : 0.4,
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
          >
            Save changes
          </button>
          {!isFormValid && (
            <p className="text-xs" style={{ color: "#6B7080" }}>
              Fill in a valid name and email to enable saving.
            </p>
          )}
          {isFormValid && savedAt && (
            <p className="text-xs flex items-center gap-1" style={{ color: "#34D399" }} role="status">
              <Check size={14} aria-hidden="true" /> Saved
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

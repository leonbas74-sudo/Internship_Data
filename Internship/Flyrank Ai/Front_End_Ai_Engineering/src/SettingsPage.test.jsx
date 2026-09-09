import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsPage, { validateName, validateEmail } from "./SettingsPage";

/* ---------- Pure validation function tests ---------- */
// Testing these in isolation (no rendering) is fast and pinpoints
// logic bugs separately from rendering/UI bugs.

describe("validateName", () => {
  test("returns an error for empty string", () => {
    expect(validateName("")).not.toBe("");
  });

  test("returns an error for whitespace-only input", () => {
    expect(validateName("   ")).not.toBe("");
  });

  test("returns no error for a valid name", () => {
    expect(validateName("Ada Lovelace")).toBe("");
  });
});

describe("validateEmail", () => {
  test("returns an error for empty string", () => {
    expect(validateEmail("")).not.toBe("");
  });

  test.each([
    "plainaddress",
    "missing-at-sign.com",
    "user@",
    "user@domain",
    "@domain.com",
  ])("rejects invalid email: %s", (value) => {
    expect(validateEmail(value)).not.toBe("");
  });

  test.each([
    "ada@example.com",
    "user.name@example.co.uk",
    "user+tag@example.com",
  ])("accepts valid email: %s", (value) => {
    expect(validateEmail(value)).toBe("");
  });
});

/* ---------- Component behavior tests ---------- */

describe("SettingsPage", () => {
  test("Save button is disabled by default", () => {
    render(<SettingsPage />);
    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled();
  });

  test("does not show error messages before a field is touched", () => {
    render(<SettingsPage />);
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
  });

  test("shows a required-name error after blurring an empty Name field", () => {
    render(<SettingsPage />);
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(screen.getByRole("alert")).toHaveTextContent(/name is required/i);
  });

  test("shows an invalid-email error for a malformed address", () => {
    render(<SettingsPage />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  test("enables Save once both fields are valid", () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ada@example.com" } });
    expect(screen.getByRole("button", { name: /save changes/i })).toBeEnabled();
  });

  test("calls onSave with trimmed values and current toggle state", () => {
    const handleSave = jest.fn();
    render(<SettingsPage onSave={handleSave} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "  Ada  " } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: " ada@example.com " } });
    fireEvent.click(screen.getByRole("switch", { name: /notifications/i })); // turn off

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(handleSave).toHaveBeenCalledWith({
      name: "Ada",
      email: "ada@example.com",
      darkMode: true,
      notifications: false,
    });
  });

  test("Dark mode and Notifications toggles default to on and can be switched off", () => {
    render(<SettingsPage />);
    const darkModeToggle = screen.getByRole("switch", { name: /dark mode/i });
    const notificationsToggle = screen.getByRole("switch", { name: /notifications/i });

    expect(darkModeToggle).toHaveAttribute("aria-checked", "true");
    expect(notificationsToggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(darkModeToggle);
    expect(darkModeToggle).toHaveAttribute("aria-checked", "false");
  });

  test("does not submit or call onSave while the form is invalid", () => {
    const handleSave = jest.fn();
    render(<SettingsPage onSave={handleSave} />);
    // Save is disabled, but simulate an Enter-key submit attempt directly
    // on the form to confirm the guard clause in handleSave also holds.
    const form = screen.getByRole("button", { name: /save changes/i }).closest("form");
    fireEvent.submit(form);
    expect(handleSave).not.toHaveBeenCalled();
  });

  test("invalid inputs have aria-invalid and are described by their error message", () => {
    render(<SettingsPage />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.blur(emailInput);

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    const describedBy = emailInput.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy)).toHaveTextContent(/email is required/i);
  });
});

import React, { useState, useMemo } from "react";

function Header({ total, completed, pending }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1f2937", margin: "0 0 1.25rem", letterSpacing: "-0.02em" }}>
        Task Manager
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: total, color: "#111827" },
          { label: "Completed", value: completed, color: "#16a34a" },
          { label: "Pending", value: pending, color: "#d97706" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "0.9rem 1.6rem",
              minWidth: 100,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span style={{ display: "block", fontSize: "1.6rem", fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ display: "block", fontSize: "0.8rem", color: "#6b7280", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Task can't be empty.");
      return;
    }
    onAddTask(trimmed);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", gap: "0.6rem" }}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            border: `1.5px solid ${error ? "#ef4444" : "#e5e7eb"}`,
            borderRadius: 10,
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.4rem",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            background: "#6366f1",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Add Task
        </button>
      </div>
      {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: "0.4rem 0 0 0.2rem" }}>{error}</p>}
    </form>
  );
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  const btnStyle = (bg, color) => ({
    border: "none",
    borderRadius: 6,
    padding: "0.4rem 0.7rem",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    background: bg,
    color,
  });

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "#fff",
        borderRadius: 10,
        padding: "0.8rem 1rem",
        marginBottom: "0.6rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        opacity: task.completed ? 0.65 : 1,
        transition: "opacity 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0 }} />

      {isEditing ? (
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setIsEditing(false);
          }}
          style={{ flex: 1, padding: "0.4rem 0.6rem", fontSize: "1rem", border: "1.5px solid #6366f1", borderRadius: 6, outline: "none" }}
        />
      ) : (
        <span
          onDoubleClick={() => {
            setDraft(task.text);
            setIsEditing(true);
          }}
          style={{
            flex: 1,
            fontSize: "1rem",
            color: task.completed ? "#9ca3af" : "#1f2937",
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
            wordBreak: "break-word",
          }}
        >
          {task.text}
        </span>
      )}

      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
        {isEditing ? (
          <>
            <button style={btnStyle("#dcfce7", "#16a34a")} onClick={saveEdit}>Save</button>
            <button style={btnStyle("#f3f4f6", "#374151")} onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button style={btnStyle("#eef2ff", "#4f46e5")} onClick={() => { setDraft(task.text); setIsEditing(true); }}>Edit</button>
            <button style={btnStyle("#fef2f2", "#dc2626")} onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}

function TaskList({ tasks, onToggle, onDelete, onEdit, onClearCompleted, completedCount, hasAnyTasks }) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#9ca3af", fontSize: "0.95rem", background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        {hasAnyTasks ? "No tasks match your search or filter." : "No tasks yet. Add one above to get started."}
      </div>
    );
  }
  return (
    <>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ul>
      {completedCount > 0 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            onClick={onClearCompleted}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "#dc2626",
              background: "#fef2f2",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Clear Completed ({completedCount})
          </button>
        </div>
      )}
    </>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem 2.4rem 0.75rem 1rem",
          fontSize: "1rem",
          border: "1.5px solid #e5e7eb",
          borderRadius: 10,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: "0.6rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#9ca3af",
            fontSize: "1.3rem",
            lineHeight: 1,
            cursor: "pointer",
            padding: "0.2rem 0.4rem",
            borderRadius: 6,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

function FilterBar({ current, onChange }) {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
      {filters.map(({ key, label }) => {
        const active = current === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              padding: "0.45rem 1rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: active ? "#fff" : "#6b7280",
              background: active ? "#6366f1" : "#fff",
              border: `1.5px solid ${active ? "#6366f1" : "#e5e7eb"}`,
              borderRadius: 999,
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.background = "#eef2ff";
                e.currentTarget.style.color = "#4f46e5";
                e.currentTarget.style.borderColor = "#c7d2fe";
              }
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Design the landing page", completed: true },
    { id: "2", text: "Write project README", completed: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (text) => setTasks((prev) => [{ id: Date.now().toString(), text, completed: false }, ...prev]);
  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const editTask = (id, newText) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      setTasks((prev) => prev.filter((t) => !t.completed));
    }
  };

  const { total, completed, pending } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) => t.text.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  }, [tasks, filter, searchTerm]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)", padding: "2.5rem 1rem", fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Header total={total} completed={completed} pending={pending} />
        <TaskForm onAddTask={addTask} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar current={filter} onChange={setFilter} />
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onClearCompleted={clearCompleted}
          completedCount={completed}
          hasAnyTasks={total > 0}
        />
      </div>
    </div>
  );
}

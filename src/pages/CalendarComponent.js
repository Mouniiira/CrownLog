import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import { useUser } from "../context/UserContext";
import "./CalendarComponent.css";

function emptyForm(selectedDate = "") {
  return {
    id: "",
    title: "",
    start: selectedDate || "",
    end: selectedDate || "",
    allDay: true,
    importance: "mild",
  };
}

export default function CalendarComponent() {
  const { user } = useUser();

  const STORAGE_KEY = user?.email
    ? `calendarEvents_${user.email}`
    : "calendarEvents_guest";

  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    if (!user?.email) return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setEvents(saved);
  }, [STORAGE_KEY, user]);

  useEffect(() => {
    if (!user?.email) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events, STORAGE_KEY, user]);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      ),
    [events]
  );

  const openNewModal = (selectedDate = "") => {
    setForm(emptyForm(selectedDate));
    setIsOpen(true);
  };

  const openEditModal = (eventObj) => {
    setForm({
      id: eventObj.id,
      title: eventObj.title || "",
      start: formatForInput(eventObj.startStr || eventObj.start, !!eventObj.allDay),
      end: formatForInput(
        eventObj.endStr || eventObj.end || eventObj.start,
        !!eventObj.allDay
      ),
      allDay: !!eventObj.allDay,
      importance: eventObj.extendedProps.importance || "mild",
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm(emptyForm());
  };

  const saveEvent = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.start) return;

    const newEvent = {
      id: form.id || crypto.randomUUID(),
      title: form.title.trim(),
      start: form.start,
      end: form.end || form.start,
      allDay: form.allDay,
      importance: form.importance,
    };

    setEvents((prev) => {
      const exists = prev.some((ev) => ev.id === newEvent.id);
      return exists
        ? prev.map((ev) => (ev.id === newEvent.id ? newEvent : ev))
        : [...prev, newEvent];
    });

    closeModal();
  };

  const deleteEvent = () => {
    if (!form.id) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== form.id));
    closeModal();
  };

  const handleDateSelect = (info) => {
    openNewModal(info.startStr);
  };

  const handleEventClick = (info) => {
    openEditModal(info.event);
  };

  const handleEventDrop = (info) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === info.event.id
          ? {
              ...ev,
              start: info.event.startStr,
              end: info.event.endStr || info.event.startStr,
              allDay: info.event.allDay,
              importance: info.event.extendedProps.importance || ev.importance || "mild",
            }
          : ev
      )
    );
  };

  const handleEventResize = (info) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === info.event.id
          ? {
              ...ev,
              start: info.event.startStr,
              end: info.event.endStr || info.event.startStr,
              allDay: info.event.allDay,
              importance: info.event.extendedProps.importance || ev.importance || "mild",
            }
          : ev
      )
    );
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="calendar-page">
        <div className="calendar-toolbar">
          <h2>Calendar</h2>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={sortedEvents}
          selectable={true}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height="auto"
          eventClassNames={(arg) => {
            const importance = arg.event.extendedProps.importance;

            if (importance === "high") return ["event-high"];
            if (importance === "mild") return ["event-mild"];
            if (importance === "low") return ["event-low"];

            return [];
          }}
        />

        {isOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>{form.id ? "Edit event" : "New event"}</h3>

              <form onSubmit={saveEvent} className="event-form">
                <label>
                  Title
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </label>

                <label>
                  Importance
                  <select
                    value={form.importance}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        importance: e.target.value,
                      }))
                    }
                  >
                    <option value="high">Very important</option>
                    <option value="mild">Mildly important</option>
                    <option value="low">Not too important</option>
                  </select>
                </label>

                <label>
                  Start
                  <input
                    type={form.allDay ? "date" : "datetime-local"}
                    value={form.start}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, start: e.target.value }))
                    }
                    required
                  />
                </label>

                <label>
                  End
                  <input
                    type={form.allDay ? "date" : "datetime-local"}
                    value={form.end}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, end: e.target.value }))
                    }
                  />
                </label>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.allDay}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        allDay: e.target.checked,
                        start: convertDateInputType(prev.start, e.target.checked),
                        end: convertDateInputType(prev.end, e.target.checked),
                      }))
                    }
                  />
                  All day
                </label>

                <div className="modal-actions">
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>

                  {form.id && (
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={deleteEvent}
                    >
                      Delete
                    </button>
                  )}

                  <button type="submit" className="primary-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function formatForInput(value, allDay = false) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return allDay ? d.toISOString().slice(0, 10) : d.toISOString().slice(0, 16);
}

function convertDateInputType(value, allDay) {
  if (!value) return "";
  if (allDay) return value.slice(0, 10);
  if (value.length === 10) return `${value}T00:00`;
  return value;
}

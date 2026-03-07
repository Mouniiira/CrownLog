import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarComponent.css";

const STORAGE_KEY = "calendarEvents";

function emptyForm(selectedDate = "") {
  return {
    id: "",
    title: "",
    start: selectedDate || "",
    end: selectedDate || "",
    allDay: true,
  };
}

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setEvents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

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
      start: formatForInput(eventObj.startStr || eventObj.start),
      end: formatForInput(eventObj.endStr || eventObj.end || eventObj.start),
      allDay: !!eventObj.allDay,
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
            }
          : ev
      )
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-toolbar">
        <h2>Calendar</h2>
        <button className="primary-btn" onClick={() => openNewModal()}>
          Add event
        </button>
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
                    setForm((prev) => ({ ...prev, allDay: e.target.checked }))
                  }
                />
                All day
              </label>

              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>

                {form.id && (
                  <button type="button" className="danger-btn" onClick={deleteEvent}>
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
  );
}

function formatForInput(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
}
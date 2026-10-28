fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    const list = document.querySelector("#starred");
    if (!list) {
      throw new Error("Star list container not found");
    }

    if (!Array.isArray(events)) {
      throw new Error("Invalid event data");
    }

    list.innerHTML = "";
    events.forEach((event) => {
      if (!event || typeof event.name !== "string") return;

      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred ?? "unknown date"}`;
      list.appendChild(item);
    });
  })
  .catch((error) => {
    const list = document.querySelector("#starred");
    if (list) {
      list.innerHTML = `<li role="status" aria-live="polite">Unable to load starred repositories.</li>`;
    }
    console.error("Failed to load events:", error);
  });

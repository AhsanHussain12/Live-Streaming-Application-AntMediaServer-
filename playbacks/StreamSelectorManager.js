export class StreamSelectorManager {
  constructor(listElement, pollInterval = 2000) {
    this.ul = listElement;
    this.pollInterval = pollInterval;
    this.publishers = [];
    this.timer = null;
    this.selectedStreamId = null;
  }

  async fetchPublishers() {
    try {
      const res = await fetch("http://localhost:5080/LiveApp/rest/v2/broadcasts/list/0/50");
      const data = await res.json();
      const newList = data.map(el => el.streamId);

      if (JSON.stringify(newList) !== JSON.stringify(this.publishers)) {
        this.publishers = newList;
        this.renderList();
      }
    } catch (e) {
      console.error("Failed to fetch publishers", e);
    }
  }

  renderList() {
    this.ul.innerHTML = "";

    this.publishers.forEach(streamId => {
      const li = document.createElement("li");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "streamSelect";
      radio.value = streamId;
      radio.id = `radio-${streamId}`;

      radio.checked = this.selectedStreamId === streamId;
      radio.onclick = () => {
        this.selectedStreamId = streamId;
      };

      const label = document.createElement("label");
      label.setAttribute("for", `radio-${streamId}`);
      label.textContent = streamId;

      li.appendChild(radio);
      li.appendChild(label);
      this.ul.appendChild(li);
    });
  }

  startPolling() {
    this.fetchPublishers();
    this.timer = setInterval(() => this.fetchPublishers(), this.pollInterval);
  }

  getSelectedStream() {
    return this.selectedStreamId;
  }

  stopPolling() {
    clearInterval(this.timer);
  }
}

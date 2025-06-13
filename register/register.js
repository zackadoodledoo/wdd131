let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addParticipantBtn");
  addButton.addEventListener("click", () => {
    participantCount++;
    const template = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", template);
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);
});

// Template for new participant
function participantTemplate(count) {
  return `
    <section class="participant participant${count}">
      <label for="name${count}">Participant ${count} Name:</label>
      <input type="text" id="name${count}" name="name${count}" required>

      <label for="fee${count}">Fee:</label>
      <input type="number" id="fee${count}" name="fee${count}" required>
    </section>
  `;
}

function submitForm(event) {
  event.preventDefault();

  const total = totalFees();
  const adultName = document.getElementById("name1").value;

  const summary = document.getElementById("summary");
  const form = document.querySelector("form");

  form.style.display = "none";
  summary.innerHTML = successTemplate({
    name: adultName,
    total,
    count: participantCount
  });

  summary.style.display = "block";
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  
  return feeElements.reduce((sum, feeInput) => {
    const value = parseFloat(feeInput.value) || 0;
    return sum + value;
  }, 0);
}

function successTemplate(info) {
  return `
    <p>Thank you ${info.name} for registering.</p>
    <p>You have registered ${info.count} participant(s) and owe $${info.total.toFixed(2)} in fees.</p>
  `;
}
// This code is for a registration form that allows users to add multiple participants and calculate the total fees.
// The form dynamically generates input fields for each participant, collects their names and fees, and displays a summary upon submission.
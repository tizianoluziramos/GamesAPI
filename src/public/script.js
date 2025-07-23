async function runCommand() {
  const cmd = document.getElementById("cmd").value;
  if (!cmd) return alert("Ingresá un comando");

  const res = await fetch("/shell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: cmd }),
  });
  const data = await res.json();

  const output = document.getElementById("output");
  if (data.error) {
    output.textContent += `Error: ${data.error}\n`;
  }
  if (data.stdout) {
    output.textContent += `${data.stdout}\n`;
  }
  if (data.stderr) {
    output.textContent += `${data.stderr}\n`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("runBtn");
  runBtn.addEventListener("click", runCommand);
});

function buildTypeSpecific(promptType) {
  switch (promptType) {
    case "character":
      return "full-body character design, clear silhouette, strong pose, readable shapes, concept art sheet feel";
    case "product":
      return "studio-quality product photograph, centered composition, clean background, suitable for e-commerce and marketing banners";
    case "ui":
      return "mobile app UI screen, modern layout, consistent spacing, clear visual hierarchy, accessible color contrast";
    case "logo":
      return "vector-based logo mark, scalable, simple geometry, works in monochrome, suitable for app icon and print";
    case "concept":
      return "cinematic wide shot environment concept, strong depth, atmospheric perspective, layered foreground, midground and background elements";
    default:
      return "";
  }
}

function buildModelTail(model, promptType) {
  if (model === "midjourney") {
    let aspect = " --ar 3:2";
    if (promptType === "ui") aspect = " --ar 9:16";
    if (promptType === "logo") aspect = " --ar 1:1";
    return aspect + " --v 6 --high detail";
  }
  return "";
}

function generatePrompt() {
  const model = document.getElementById("model").value;
  const promptType = document.getElementById("promptType").value;
  const subjectRaw = document.getElementById("subject").value.trim();
  const subject = subjectRaw || "your design idea";

  const style = document.getElementById("style").value;
  const palette = document.getElementById("palette").value;
  const lighting = document.getElementById("lighting").value;
  const mood = document.getElementById("mood").value;
  const extras = document.getElementById("extras").value.trim();

  // Naive prompt
  const naive = "Create an image of " + subject + " in a nice style.";
  document.getElementById("naivePrompt").value = naive;

  // Engineered prompt
  const typeSpecific = buildTypeSpecific(promptType);
  const modelTail = buildModelTail(model, promptType);

  let modelLabel = "Generic model";
  if (model === "midjourney") modelLabel = "Midjourney-style prompt";
  document.getElementById("modelTag").textContent = modelLabel;

  let base = "";
  base += "A " + mood.toLowerCase() + " " + subject + ", ";
  base += "in a " + style.toLowerCase() + " style, ";
  base += "using a " + palette.toLowerCase() + " color palette and ";
  base += lighting.toLowerCase() + ". ";
  base += "Designed as " + typeSpecific + ". ";
  if (extras.length > 0) {
    base += extras + ". ";
  }
  base += modelTail;

  document.getElementById("engineeredPrompt").value = base;
  document.getElementById("copyStatus").textContent = "";
}

function copyPrompt() {
  const textarea = document.getElementById("engineeredPrompt");
  const status = document.getElementById("copyStatus");

  if (!textarea.value.trim()) {
    status.textContent = "Generate a prompt first.";
    return;
  }

  textarea.select();
  textarea.setSelectionRange(0, 99999);
  try {
    document.execCommand("copy");
    status.textContent = "Copied!";
  } catch (e) {
    status.textContent = "Press Ctrl+C / long-press to copy.";
  }
}

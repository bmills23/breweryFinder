const systemSettingLight = window.matchMedia("(prefers-color-scheme: dark)");
const favicon = document.getElementById('favicon');
console.log(systemSettingLight);

// Check if the user has selected a dark color scheme
if (systemSettingLight.matches) {
    // Apply the dark theme
    document.documentElement.setAttribute("data-theme", "coffee");
    document.documentElement.style.font = '16px / 24px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
    favicon.href = "./assets/favicon.ico";
} else {
    // Apply the light theme
    document.documentElement.setAttribute("data-theme", "cyberpunk");
    favicon.href = "./assets/favicon-light.ico";
}
  
// Add an event listener to the systemSettingLight media query
// to detect changes in the user's theme preference
systemSettingLight.addEventListener("change", (event) => {
    if (event.matches) {
        // Apply the dark theme
        document.documentElement.setAttribute("data-theme", "coffee");
        document.documentElement.style.font = '16px / 24px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
        favicon.href = "./assets/favicon.ico";
    } else {
        // Apply the light theme
        document.documentElement.setAttribute("data-theme", "cyberpunk");
        favicon.href = "./assets/favicon-light.ico";
    }
});
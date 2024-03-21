const systemSettingLight = window.matchMedia("(prefers-color-scheme: dark)");
console.log(systemSettingLight);

// Check if the user has selected a dark color scheme
if (systemSettingLight.matches) {
    // Apply the dark theme
    document.documentElement.setAttribute("data-theme", "luxury");
} else {
    // Apply the light theme
    document.documentElement.setAttribute("data-theme", "retro");
}
  
// Add an event listener to the systemSettingLight media query
// to detect changes in the user's theme preference
systemSettingLight.addEventListener("change", (event) => {
    if (event.matches) {
        // Apply the dark theme
        document.documentElement.setAttribute("data-theme", "luxury");
    } else {
        // Apply the light theme
        document.documentElement.setAttribute("data-theme", "retro");
    }
});
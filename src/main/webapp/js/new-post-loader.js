function loadMarkdownEditor() {
  let simplemde = new SimpleMDE({
    autoDownloadFontAwesome: true,
  	autosave: {
  		enabled: true,
  		uniqueId: "message "
  	},
  	element: document.getElementById("message-input"),
  	forceSync: true,
  	status: false
  });
}

/** Fetches data and populates the UI of the page. */
function buildUI() {
  createMapForNewPost();
  loadMarkdownEditor();
}
/*
 * Created by rainier39 (https://github.com/rainier39/NotesApp)
 */

// Add a new note.
function newNote() {
    // Get the user's input.
    let name = document.getElementById("newname").value;
    let content = document.getElementById("newcontent").value;
    // Sanitize content, encode HTML sensitive characters. (I needed to do this on input because bugs)
    content = content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    // Add the note to local storage.
    localStorage.setItem(name, content);
    // Clear the form.
    document.getElementById("newname").value = "";
    document.getElementById("newcontent").value = "";
    // Set the form to its default in case we were editing.
    document.getElementById("submit").value = "Add Note";
    document.getElementById("legend").innerText = "New Note";
    if (document.getElementById("cancel") != null) {
        document.getElementById("cancel").remove();
    }
    // Re-render the notes since we added a new one or edited an existing one.
    render();
}

// Render the notes.
function render() {
    let html = "";
    // Loop through local storage to get the notes.
    Object.keys(localStorage).forEach(function(key) {
        let name = key;
        let value = localStorage.getItem(key);
        // Add note HTML.
        let contentPatterns = ["&", "&amp;", "'", "&#39;", "\\", "\\\\", '"', '\\"', "<", "&lt;", ">", "&gt;"];
        html += "<div class='note'>" + name.replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "<hr><span id='" + name.replaceAll("'", "&#39;") + "_content'>" + value + "</span><hr><input type='submit' value='Edit' onclick='editNote(&quot;";
        for (var i = 0; i < contentPatterns.length; i += 2) {
            name = name.replaceAll(contentPatterns[i], contentPatterns[i+1]);
        }
        html += name + "&quot;)'></input> <input type='submit' value='Delete' onclick='deleteNote(&quot;" + name + "&quot;)'></input></div>";
    });
    // Default text when there are no notes.
    if (html == "") {
        html = "No notes yet.";
    }
    // Push the HTML to the page.
    document.getElementById("notes").innerHTML = html;
}

// Edit a note.
function editNote(name) {
    // Put the note name and content into the form.
    document.getElementById("newname").value = name;
    document.getElementById("newcontent").value = document.getElementById(name + "_content").innerText;
    // Change the form to say we're editing.
    document.getElementById("submit").value = "Edit Note";
    document.getElementById("legend").innerText = "Edit Note";
    // Add a cancel button.
    if (document.getElementById("cancel") == null) {
        document.getElementById("submit").outerHTML += "<input type='submit' id='cancel' value='Cancel Edit' onclick='cancelEdit()'>";
    }
}

// Cancel an edit, clear the form.
function cancelEdit() {
    if (confirm("Are you sure you want to cancel this edit?")) {
        // Clear the form.
        document.getElementById("newname").value = "";
        document.getElementById("newcontent").value = "";
        // Set the form to its default in case we were editing.
        document.getElementById("submit").value = "Add Note";
        document.getElementById("legend").innerText = "New Note";
        document.getElementById("cancel").remove();
    }
}

// Delete a note.
function deleteNote(name) {
    if (confirm("Are you sure you want to delete this note?")) {
        // Delete the cookie.
        localStorage.removeItem(name);
        // Re-render the notes since this one is gone now.
        render();
    }
}

// Render the notes (or the no notes message).
render();

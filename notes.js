/*
 * Created by rainier39 (https://github.com/rainier39/NotesApp)
 */

// Add a new note.
function newNote() {
    // Get the user's input.
    let name = document.getElementById("newname").value;
    let content = document.getElementById("newcontent").value;
    // Add the note to local storage.
    localStorage.setItem(name, content);
    // Clear the form.
    document.getElementById("newname").value = "";
    document.getElementById("newcontent").value = "";
    // Set the form to its default in case we were editing.
    document.getElementById("submit").value = "Add Note";
    document.getElementById("legend").innerText = "New Note";
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
        html += "<div class='note'>" + name + "<hr><span id='" + name + "_content'>" + value + "</span><hr><input type='submit' value='Edit' onclick='editNote(\"" + name + "\")'></input> <input type='submit' value='Delete' onclick='deleteNote(\"" + name + "\")'></input></div>";
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
}

// Delete a note.
function deleteNote(name) {
    // Delete the cookie.
    localStorage.removeItem(name);
    // Re-render the notes since this one is gone now.
    render();
}

// Render the notes (or the no notes message).
render();

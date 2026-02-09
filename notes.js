/*
 * Created by rainier39 (https://github.com/rainier39/NotesApp)
 */

// Add a new note.
function newNote() {
    let name = document.getElementById("newname").value;
    let content = document.getElementById("newcontent").value;
    // Make newlines work.
    content = content.replace("\n", "</br>");
    // Make semicolons work (this is probably very bad for copying and pasting code).
    content = content.replace(";", ";");
    // Store the note as a cookie with a long expiration date.
    let expiry = new Date();
    expiry.setTime(expiry.getTime()+(100*365*24*60*60*1000));
    document.cookie = name + "=" + content + "; expires=" + expiry.toGMTString();
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
    // Loop through the cookies to get the notes.
    let keyValuePairs = document.cookie.split(/; */);
    let html = "";
    for(var i = 0; i < keyValuePairs.length; i++) {
        let name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
        let value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
        // Need this otherwise weird blank note shows up when there are no cookies.
        if (name == "") break;
        // Add note HTML.
        html += "<div class='note'>" + name + "<hr><span id='" + name + "_content'>" + value + "</span><hr><input type='submit' value='Edit' onclick='editNote(\"" + name + "\")'></input> <input type='submit' value='Delete' onclick='deleteNote(\"" + name + "\")'></input></div>";
    }
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
    document.cookie = name + '=; Max-Age=0';
    // Re-render the notes since this one is gone now.
    render();
}

// Render the notes (or the no notes message).
render();

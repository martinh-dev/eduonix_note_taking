function loadNotes(){
    fetch("/notes").then((results) => {
        return results.json();
    }).then((data) =>{
        data.forEach(element => {
            var list = document.createElement("li");
            list.innerHTML = element.note + " (ID: " + element._id + ")";
            document.getElementById("notes").append(list);
        });
    })
}

document.getElementById("deletebtn").addEventListener("click", (data) => {
    var id = document.getElementById("deleteid");
    if(id.value != ""){
        fetch("/notes/" + id.value, {
            method: "DELETE"
        }).then((results) => {
            return results.json();
        }).then((data) =>{
            document.getElementById("notes").innerHTML = "";
            data.forEach(element => {
                var list = document.createElement("li");
                list.innerHTML = element.note + " (ID: " + element._id + ")";
                document.getElementById("notes").append(list);
            });
        });
    document.getElementById("deleteid").value = "";
    }
});

document.getElementById("addbtn").addEventListener("click", (data) => {
    var note = document.getElementById("addnote");
    if(note.value != ""){
        fetch("/notes/" + note.value, {
            method: "POST"
        }).then((results) => {
            return results.json();
        }).then((data) =>{
            document.getElementById("notes").innerHTML = "";
            data.forEach(element => {
                var list = document.createElement("li");
                list.innerHTML = element.note + " (ID: " + element._id + ")";
                document.getElementById("notes").append(list);
            });
        });
    document.getElementById("addnote").value = "";
    }
});

document.getElementById("updatebtn").addEventListener("click", (data) => {
    var note = document.getElementById("updatenote");
    var id = document.getElementById("updateid");
    if(note.value != "" && id.value != ""){
        fetch("/notes/" + id.value + "/" + note.value, {
            method: "PATCH"
        }).then((results) => {
            return results.json();
        }).then((data) =>{
            document.getElementById("notes").innerHTML = "";
            data.forEach(element => {
                var list = document.createElement("li");
                list.innerHTML = element.note + " (ID: " + element._id + ")";
                document.getElementById("notes").append(list);
            });
        });
    document.getElementById("updateid").value = "";
    document.getElementById("updatenote").value = "";
    }
});

document.getElementById("searchbtn").addEventListener("click", (data) => {
    var id = document.getElementById("searchid");
    if(id.value != ""){
        fetch("/notes/" + id.value, {
            method: "GET"
        }).then((results) => {
            return results.json();
        }).then((data) =>{
            document.getElementById("searchresult").innerHTML = "";
            data.forEach(element => {
                var list = document.createElement("li");
                list.innerHTML = element.note + " (ID: " + element._id + ")";
                document.getElementById("searchresult").append(list);
            });
        });
    document.getElementById("searchid").value = "";
    }
});
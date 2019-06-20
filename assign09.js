const select_box = document.getElementById("select-box");
const displayInfo = document.getElementById("cityInfo");
const fileInput = document.getElementById("fileInput");
const part2output = document.getElementById("part2output");

document.getElementById("button").addEventListener("click", () => {
    let output;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `./txtFiles/${select_box[select_box.selectedIndex].value}`, true);
    xhr.onload = function() {
        if (this.status == 200) {
            // put response handling here
            let lines = this.responseText.split("\n");
            lines.forEach(item => {
                output += `<li>${item}</li}` + "\n";
            });
            displayInfo.innerHTML = `<ul>${output}</ul>`;
        }
    }
    xhr.onerror = function() {
        // put error handling here
        displayInfo.innerHTML = "there was an issue";
    }
    xhr.send();
})

document.getElementById("fileButton").addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `./txtFiles/${fileInput.value}`, true);
    xhr.onload = function() {
        if (fileInput.value == "") {
            part2output.innerHTML = `
            <h3>Please enter some text</h3> 
            `
        }
        else if (this.status == 200) {
            // everything is good
            let jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            let output = "";
            jsonData.students.forEach(student => {
                output += `
                <ul>
                    <li>Full Name: ${student.first} ${student.last}</li>
                    <li>Address: ${student.city}, ${student.state}, ${student.zip}</li>
                    <li>Major: ${student.major}</li>
                    <li>GPA: ${student.gpa}</li>
                </ul>
                `
            })
            part2output.innerHTML = output;
        }
    }
    xhr.onerror = function() {
        console.log("woops");
    }
    xhr.onloadend = function() {
        if (xhr.status == 404) {
            part2output.innerHTML = `
            <h3>${fileInput.value} not found</h3>
            `
        }
    }
    xhr.send();
})

document.getElementById("clear").addEventListener("click", () => {
    part2output.innerHTML = "";
    displayInfo.innerHTML = "";
})
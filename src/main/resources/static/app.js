window.addEventListener('DOMContentLoaded', initApp);
let editingUserId = null;
let usersList = [];


async function initApp(){

    const getUsers = await fetchUsers();
    usersList = getUsers;

    renderUsers(usersList);
    console.log(getUsers);

    document.querySelector("#userForm").addEventListener("submit", createUser);
}

function clearUsersTable() {
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";
}


async function createUser(e){
    e.preventDefault();

    const form = e.target;
    const user = {
        name: form.name.value,
        email: form.email.value,
        userName: form.username.value
    };

    if (editingUserId) {
        const resp = await fetch(`http://localhost:8080/api/users${editingUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                userName: form.username.value
            })        });

        if (!resp.ok) {
            console.error("Error updating user 💀");
            return;
        }

        const data = await resp.json();
        console.log("User updated:", data);

        const idx = usersList.findIndex(u => u.id === editingUserId);
        if (idx !== -1) {
            usersList[idx] = { ...usersList[idx], ...data };
        }

        clearUsersTable();
        renderUsers(usersList);

        form.reset();
        editingUserId = null;
        return data;
    } else {

        const resp = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!resp.ok) {
            console.error("Error in creating user 💀");
            return;
        }

        const data = await resp.json();
        console.log("User created:", data);

        renderUser(data)
        form.reset();
        return data;
    }
}

function addUser(user) {
    const tbody = document.querySelector("#usersTable tbody");

    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;


    tr.appendChild(tdName);
    tr.appendChild(tdEmail);

    tbody.appendChild(tr);
}



async function fetchUsers(){
    const resp = await fetch("http://localhost:8080/api/users")

    if (!resp.ok){
        console.log("Oopsie mistake was made!! :(");
    }
    return await resp.json();

}

function renderUsers(users){
    users.forEach(u => renderUser(u));
}

function renderUser(user){
    const tbody = document.querySelector("#usersTable tbody");

    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;


    const tdUsername = document.createElement("td");
    tdUsername.textContent = user.userName;

    const tdEdit = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editUser(user));
    editBtn.className = "edit-btn";
    editBtn.id = "editBtn"
    tdEdit.appendChild(editBtn);



    const tdDelete = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
        await fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: "DELETE"
        });
        console.log("Removing user with id: "+user.id);
        tr.remove();
    });
    deleteBtn.className = "delete-btn";
    deleteBtn.id = "deleteBtn"
    tdDelete.appendChild(deleteBtn);



    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdUsername)
    tr.appendChild(tdEdit);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
}

function editUser(user){
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const username = document.querySelector("#username");


    name.value=user.name;
    email.value=user.email;
    username.value=user.username;

    editingUserId=user.id;
}



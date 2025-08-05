const input = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

let timeout = null;

input.addEventListener("input", function () {
  clearTimeout(timeout);

  const username = input.value.trim();

  if (username === "") {
    resultDiv.innerHTML = "";
    return;
  }

  // Debounce: Wait 500ms after user stops typing
  timeout = setTimeout(() => {
    fetchUser(username);
  }, 500);
});

function fetchUser(username) {
  resultDiv.innerHTML = "⏳ Loading...";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((data) => {
      resultDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar" />
        <h2>${data.name || "No Name"}</h2>
        <p><strong>Username:</strong> ${data.login}</p>
        <p><strong>Location:</strong> ${data.location || "Not Available"}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Following:</strong> ${data.following}</p>
        <a href="${data.html_url}" target="_blank">🔗 View Profile</a>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  const noun = document.getElementById("noun1").value;
  const adjective = document.getElementById("adjective1").value;

  // Make a POST request to the server with the form data
  fetch("/itc505/lab7", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noun1: noun, adjective1: adjective }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/itc505/result"; // Redirect to the result page after form submission
      } else {
        throw new Error("Error in form submission");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors if needed
    });
}

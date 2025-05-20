// Assumes Firebase is already initialized in fb-login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('record-form');
  const container = document.getElementById('records-container');

  // Handle form submission to add records
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = firebase.auth().currentUser;
      if (!user) {
        alert('Please log in to submit a record.');
        return;
      }

      const name = document.getElementById('name').value;
      const university = document.getElementById('university').value;
      const preferences = document.getElementById('preferences').value;

      try {
         const existingRecords = await window.db.collection('records')
        .where('uid', '==', user.uid)
        .get();

        if (!existingRecords.empty) {
  alert('You already have a record. Please delete it before adding a new one.');
  return;
}
        
        await window.db.collection('records').add({
          uid: user.uid,
          name,
          university,
          preferences,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Record added!');
        displayRecords();
        form.reset();
      } catch (err) {
        console.error('Error writing record:', err);
        alert('Something went wrong.');
      }
    });
  }

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
  // Real time listener
      db.collection("users").doc(user.uid).onSnapshot((doc) => {
  if (doc.exists) {
    console.log("Realtime user data:", doc.data());
    // Update your UI here
  }
});
      // Fetch user profile data (optional)
      window.db.collection("users").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            console.log("User data:", doc.data());
            // Update UI with user info here if needed
          } else {
            console.log("No user record found!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      if (container) {
        displayRecords();  // Show records when user is logged in
      }
    } else {
      // Not logged in 
      // Nothing for now
    }
  });
});

// Function to display records from Firestore
async function displayRecords() {
  const container = document.getElementById('records-container');
  if (!container) return;

  container.innerHTML = '';

  try {
    const snapshot = await window.db.collection('records').orderBy('timestamp', 'desc').get();

    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="https://via.placeholder.com/80" alt="User" />
        <h3>${data.name}</h3>
        <p>${data.university}</p>
        <p>Looking for: ${data.preferences}</p>
        <button class="btn">Message</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load records:', err);
  }
}


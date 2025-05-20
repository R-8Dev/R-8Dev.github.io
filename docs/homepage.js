// Assumes Firebase is already initialized in fb-login.js

document.addEventListener('DOMContentLoaded', () => {

const universityFilter = document.getElementById('filter-university');
const genderFilter = document.getElementById('filter-gender');
const preferencesFilter = document.getElementById('filter-preferences');

// Call displayRecords when any filter changes
[universityFilter, genderFilter, preferencesFilter].forEach(el => {
  if (el) {
    el.addEventListener('change', displayRecords);
    if (el.tagName === 'INPUT') {
      el.addEventListener('input', displayRecords);
    }
  }
});

  
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
      const gender = document.getElementById("gender").value;

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
          gender,
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

  const preferencesTextarea = document.getElementById('preferences');
const wordCountDisplay = document.getElementById('word-count');

preferencesTextarea.addEventListener('input', () => {
  const words = preferencesTextarea.value.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  wordCountDisplay.textContent = `${wordCount} / 250 words`;
  
  if (wordCount > 250) {
    wordCountDisplay.style.color = 'red';
  } else {
    wordCountDisplay.style.color = 'black';
  }
});

  
});

// Function to display records from Firestore
async function displayRecords() {
  const container = document.getElementById('records-container');
  if (!container) return;

  const university = document.getElementById('filter-university').value;
  const gender = document.getElementById('filter-gender').value;
  const preferences = document.getElementById('filter-preferences').value.toLowerCase();

  container.innerHTML = '';

  let query = window.db.collection('records').orderBy('timestamp', 'desc');

  if (university) {
    query = query.where('university', '==', university);
  }

  if (gender) {
    query = query.where('gender', '==', gender);
  }

  try {
    const snapshot = await query.get();
    const currentUser = firebase.auth().currentUser;
    const currentUserId = currentUser ? currentUser.uid : null;

    snapshot.forEach(doc => {
      const data = doc.data();

      // Filter preferences manually (because Firestore can't do partial text search)
      if (preferences && !data.preferences.toLowerCase().includes(preferences)) {
        return; // skip if preferences don't match
      }

      const isOwner = currentUserId === data.uid;

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="https://via.placeholder.com/80" alt="User" />
        <h3>${data.name}</h3>
        <p>${data.university}</p>
        <p>Looking for: ${data.preferences}</p>
        <button class="btn">Message</button>
        ${isOwner ? `<button class="btn delete-btn" data-id="${doc.id}">Delete</button>` : ''}
      `;

      container.appendChild(card);

      if (isOwner) {
        card.querySelector('.delete-btn').addEventListener('click', async () => {
          if (confirm("Are you sure you want to delete your record?")) {
            try {
              await window.db.collection('records').doc(doc.id).delete();
              displayRecords(); // Refresh list after deletion
            } catch (err) {
              alert("Failed to delete record.");
              console.error(err);
            }
          }
        });
      }
    });
  } catch (err) {
    console.error('Failed to load records:', err);
    alert('Error loading records.');
  }
}

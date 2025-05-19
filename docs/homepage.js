// Assumes Firebase is already initialized in fb-login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('record-form');
  const container = document.getElementById('records-container');

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
        await db.collection('records').add({
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

  // Show records only if user is logged in
  firebase.auth().onAuthStateChanged((user) => {
    if (user && container) {
      displayRecords();
    }
  });
});

async function displayRecords() {
  const container = document.getElementById('records-container');
  if (!container) return;

  container.innerHTML = '';

  try {
    const snapshot = await db.collection('records').orderBy('timestamp', 'desc').get();
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

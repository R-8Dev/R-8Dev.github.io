import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'test'));
        const docsData = [];
        snapshot.forEach(doc => docsData.push({ id: doc.id, ...doc.data() }));
        setData(docsData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [user]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => setError(err.message));
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        <h1>Please sign in</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h2>Firestore 'test' collection data:</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {data.map(doc => (
          <li key={doc.id}>{doc.id}: {JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

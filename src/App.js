import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import SignUp from './SignUp';  // import SignUp component

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form states for sign in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Toggle between Sign In and Sign Up views
  const [showSignUp, setShowSignUp] = useState(false);

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

  // User is not signed in
  if (!user) {
    return (
      <div>
        {showSignUp ? (
          <>
            <SignUp />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)}>Sign In</button>
            </p>
          </>
        ) : (
          <>
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
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        )}
      </div>
    );
  }

  // User is signed in
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <h2>Firestore 'test' collection data:</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {data.map(doc => (
          <li key={doc.id}>{doc.id}: {JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

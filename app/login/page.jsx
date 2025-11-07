'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 🧠 بيانات الدخول (يمكنك تعديلها لاحقًا)
    const ADMIN_EMAIL = 'admin@bazaro.com';
    const ADMIN_PASSWORD = '123456';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin');
    } else {
      setError('❌ البريد أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div style={styles.container}>
      <h1>🔐 تسجيل الدخول إلى لوحة BAZARO</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>دخول</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.7rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.7rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

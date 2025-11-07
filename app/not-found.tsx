export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>404 - الصفحة غير موجودة</h1>
      <p>يبدو أن الصفحة التي تحاول الوصول إليها غير موجودة.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        العودة إلى الصفحة الرئيسية
      </a>
    </div>
  );
}

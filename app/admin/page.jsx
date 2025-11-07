'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 🔗 إعداد Supabase
const supabaseUrl = 'https://lwvzetqmozepumvctdnq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dnpldHFtb3plcHVtdmN0ZG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTAzMjcsImV4cCI6MjA3ODEyNjMyN30.pcRDmugKaJaegbYpBHzbbzXotQoolYKiMsoZnxS_p4g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  // 📦 جلب المنتجات من Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
    } else {
      setProducts(data);
    }
  };

  // ➕ إضافة منتج جديد
  const addProduct = async () => {
    if (!name || !price) {
      setMessage('⚠️ يرجى إدخال اسم المنتج والسعر');
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert([{ name, description, price, image_url: imageUrl }]);

    if (error) {
      console.error(error);
      setMessage('❌ فشل في إضافة المنتج');
    } else {
      setMessage('✅ تم إضافة المنتج بنجاح!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      fetchProducts(); // 🔄 تحديث القائمة بعد الإضافة
    }
  };

  // 🗑️ حذف منتج
  const deleteProduct = async (id) => {
    const confirmDelete = confirm('هل أنت متأكد من حذف هذا المنتج؟');
    if (!confirmDelete) return;

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      console.error('❌ فشل في الحذف:', error);
      setMessage('❌ حدث خطأ أثناء الحذف');
    } else {
      setMessage('🗑️ تم حذف المنتج بنجاح');
      fetchProducts(); // تحديث القائمة بعد الحذف
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>🛍️ لوحة التحكم - BAZARO</h1>

      <input
        type="text"
        placeholder="اسم المنتج"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="الوصف"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="السعر بالدينار الجزائري"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="رابط الصورة"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={addProduct}>➕ إضافة المنتج</button>
      <p>{message}</p>

      <h2>📦 قائمة المنتجات</h2>
      {products.length === 0 ? (
        <p>لا توجد منتجات بعد.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: '1.5rem',
                borderBottom: '1px solid #ddd',
                paddingBottom: '1rem',
              }}
            >
              <strong>{p.name}</strong> - {p.price} DZD
              {p.image_url && (
                <div>
                  <img
                    src={p.image_url}
                    alt={p.name}
                    width="100"
                    style={{ borderRadius: '8px', marginTop: '5px' }}
                  />
                </div>
              )}
              <p>{p.description}</p>
              <button
                onClick={() => deleteProduct(p.id)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '5px',
                }}
              >
                🗑️ حذف
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        input,
        textarea {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        button {
          width: 100%;
          background: #10b981;
          color: white;
          border: none;
          padding: 0.7rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
        button:hover {
          background: #059669;
        }
        h2 {
          margin-top: 2rem;
          border-top: 2px solid #eee;
          padding-top: 1rem;
        }
      `}</style>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwvzetqmozepumvctdnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dnpldHFtb3plcHVtdmN0ZG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTAzMjcsImV4cCI6MjA3ODEyNjMyN30.pcRDmugKaJaegbYpBHzbbzXotQoolYKiMsoZnxS_p4g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const addProduct = async () => {
    if (!name || !price) {
      setMessage('⚠️ يرجى إدخال اسم المنتج والسعر');
      return;
    }

    const { data, error } = await supabase
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
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
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
      `}</style>
    </div>
  );
}

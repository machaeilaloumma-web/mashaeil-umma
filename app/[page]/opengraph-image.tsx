import OpengraphImage from 'components/opengraph-image';
import { supabase } from '@/lib/supabase/client'; // ✅ ربط Supabase

export default async function Image({ params }: { params: { page: string } }) {
  // جلب الصفحة من قاعدة البيانات في Supabase
  const { data: page, error } = await supabase
    .from('pages')
    .select('title, seo')
    .eq('slug', params.page)
    .single();

  if (error) {
    console.error('Error fetching page:', error);
  }

  // استخدام العنوان الموجود في قاعدة البيانات أو قيمة افتراضية
  const title = page?.seo?.title || page?.title || 'Default Title';

  return await OpengraphImage({ title });
}

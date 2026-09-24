import type { Book } from './types';

/**
 * بيانات نموذجية لإثبات البنية فقط — reviewedBy فارغ عمدًا لكل الكتب هنا
 * (لا مراجعة بشرية وهمية). قبل الإطلاق الفعلي: كل كتاب يُراجَع فرديًا (D4/book-catalog-rag skill).
 */
export const books: Book[] = [
  {
    slug: 'riyad-as-saliheen',
    title: 'رياض الصالحين',
    author: 'الإمام النووي',
    section: 'حديث',
    summary: '[نموذج — يُستبدل بملخص فعلي مُراجَع قبل النشر]',
    hasMadhhabDispute: false,
    licenseStatus: 'فهرس_فقط',
    sources: ['فهرس المكتبة الشاملة'],
    reviewedBy: '',
    aiGenerated: true,
  },
  {
    slug: 'bulugh-al-maram',
    title: 'بلوغ المرام',
    author: 'ابن حجر العسقلاني',
    section: 'حديث',
    summary: '[نموذج — يُستبدل بملخص فعلي مُراجَع قبل النشر]',
    hasMadhhabDispute: false,
    licenseStatus: 'فهرس_فقط',
    sources: ['فهرس المكتبة الشاملة'],
    reviewedBy: '',
    aiGenerated: true,
  },
  {
    slug: 'al-aqidah-al-wasitiyyah',
    title: 'العقيدة الواسطية',
    author: 'ابن تيمية',
    section: 'عقيدة',
    summary: '[نموذج — يُستبدل بملخص فعلي مُراجَع قبل النشر]',
    hasMadhhabDispute: false,
    licenseStatus: 'ملخص_فقط',
    sources: ['فهرس المكتبة الشاملة'],
    reviewedBy: '',
    aiGenerated: true,
  },
  {
    slug: 'al-muwatta',
    title: 'الموطأ',
    author: 'الإمام مالك',
    section: 'فقه',
    // مثال على كتاب فيه خلاف فقهي — يتطلب madhhabNote إلزاميًا (FR5)
    summary: '[نموذج — يتضمن مسائل خلافية بين المذاهب، يحتاج نسب المذهب لكل قول]',
    hasMadhhabDispute: true,
    madhhabNote: '[نموذج — يُملأ فعليًا: توضيح المذهب المالكي مقابل غيره لكل مسألة خلافية مذكورة]',
    licenseStatus: 'فهرس_فقط',
    sources: ['فهرس المكتبة الشاملة'],
    reviewedBy: '',
    aiGenerated: true,
  },
];

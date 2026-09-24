export interface Book {
  slug: string;
  title: string;
  author: string;
  section: string; // إحدى الأقسام العشرة بـ data/sections.json
  summary: string; // AI-generated ثم مُراجَع
  hasMadhhabDispute: boolean; // FR5 — هل تتضمن مسائل فقهية خلافية؟
  madhhabNote?: string; // إلزامي إن كان hasMadhhabDispute = true
  licenseStatus: 'فهرس_فقط' | 'ملخص_فقط'; // مؤكَّد — لا خيار نص كامل إطلاقًا
  sources: string[];
  reviewedBy: string; // فارغ = غير مُراجَع، لا يُنشر (D4)
  reviewedAt?: string;
  aiGenerated: boolean;
}

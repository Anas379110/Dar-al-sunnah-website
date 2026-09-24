import { describe, it, expect } from 'vitest';
import { isPublished, isValidForPublish, getPublishableBooks, filterBySection, searchBooks, getAllSections, getBookBySlug } from './sunnah';
import type { Book } from '../data/types';

function makeBook(overrides: Partial<Book>): Book {
  return {
    slug: 'test-book',
    title: 'كتاب تجريبي',
    author: 'مؤلف تجريبي',
    section: 'حديث',
    summary: 'ملخص',
    hasMadhhabDispute: false,
    licenseStatus: 'فهرس_فقط',
    sources: ['مصدر'],
    reviewedBy: '',
    aiGenerated: true,
    ...overrides,
  };
}

describe('isPublished', () => {
  it('يرفض بلا reviewedBy', () => {
    expect(isPublished(makeBook({ reviewedBy: '' }))).toBe(false);
  });
});

describe('isValidForPublish — القاعدة الأصرم: نسب المذهب عند الخلاف', () => {
  it('كتاب مُراجَع بلا خلاف فقهي = صالح للنشر', () => {
    expect(isValidForPublish(makeBook({ reviewedBy: 'مراجع', hasMadhhabDispute: false }))).toBe(true);
  });

  it('كتاب فيه خلاف فقهي بلا madhhabNote = يُرفض رغم المراجعة (القاعدة الأصرم)', () => {
    const book = makeBook({ reviewedBy: 'مراجع', hasMadhhabDispute: true, madhhabNote: undefined });
    expect(isValidForPublish(book)).toBe(false);
  });

  it('كتاب فيه خلاف فقهي مع madhhabNote مملوء = صالح', () => {
    const book = makeBook({ reviewedBy: 'مراجع', hasMadhhabDispute: true, madhhabNote: 'المذهب المالكي...' });
    expect(isValidForPublish(book)).toBe(true);
  });

  it('madhhabNote بمسافات فقط لا يُعتبر مملوءًا فعليًا', () => {
    const book = makeBook({ reviewedBy: 'مراجع', hasMadhhabDispute: true, madhhabNote: '   ' });
    expect(isValidForPublish(book)).toBe(false);
  });

  it('كتاب غير مُراجَع أصلًا = مرفوض حتى لو لا خلاف فيه', () => {
    expect(isValidForPublish(makeBook({ reviewedBy: '', hasMadhhabDispute: false }))).toBe(false);
  });
});

describe('getAllSections', () => {
  it('يُرجع 10 أقسام بالضبط (FR1)', () => {
    expect(getAllSections()).toHaveLength(10);
  });
});

describe('filterBySection', () => {
  it('يفلتر بدقة حسب القسم', () => {
    const fiqh = makeBook({ slug: 'a', section: 'فقه' });
    const aqidah = makeBook({ slug: 'b', section: 'عقيدة' });
    const result = filterBySection([fiqh, aqidah], 'فقه');
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('a');
  });
});

describe('searchBooks — يبحث ضمن الكتب الصالحة للنشر فقط', () => {
  it('لا يُرجع نتائج من الكتب النموذجية غير المُراجَعة (بيانات books.ts الحالية)', () => {
    // كل الكتب النموذجية بـ books.ts حاليًا reviewedBy فارغ عمدًا (لا مراجعة وهمية)
    expect(searchBooks('رياض')).toHaveLength(0);
  });
});

describe('getBookBySlug', () => {
  it('يجد كتابًا بمعرّفه حتى لو غير مُراجَع بعد (لصفحة "قيد الإعداد")', () => {
    expect(getBookBySlug('riyad-as-saliheen')).toBeDefined();
  });

  it('يُرجع undefined لمعرّف غير موجود', () => {
    expect(getBookBySlug('غير-موجود')).toBeUndefined();
  });
});

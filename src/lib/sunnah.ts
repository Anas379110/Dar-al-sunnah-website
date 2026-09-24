import { books } from '../data/books';
import sectionsData from '../data/sections.json';
import type { Book } from '../data/types';

const sections = sectionsData as string[];

export function getAllSections(): string[] {
  return sections;
}

export function isPublished(book: Book): boolean {
  return book.reviewedBy.trim() !== '';
}

/**
 * القاعدة الأصرم بهذا الموقع (SRS.md — NFR/Error Flow):
 * كتاب فيه خلاف فقهي (hasMadhhabDispute=true) يُرفض نشره إن لم يحمل madhhabNote —
 * لا يُنشر حكم فقهي واحد كأنه المطلق عند وجود خلاف مذهبي.
 */
export function isValidForPublish(book: Book): boolean {
  if (!isPublished(book)) return false;
  if (book.hasMadhhabDispute && (!book.madhhabNote || book.madhhabNote.trim() === '')) {
    return false;
  }
  return true;
}

export function getPublishableBooks(): Book[] {
  return books.filter(isValidForPublish);
}

export function filterBySection(all: Book[], section: string): Book[] {
  return all.filter((b) => b.section === section);
}

export function searchBooks(query: string): Book[] {
  const trimmed = query.trim();
  if (trimmed === '') return getPublishableBooks();
  return getPublishableBooks().filter(
    (b) => b.title.includes(trimmed) || b.author.includes(trimmed)
  );
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

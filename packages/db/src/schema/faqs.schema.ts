import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const Faqs = pgTable("faqs", {
  answer: text("answer").notNull(),
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
});

export const insertFaqsSchema = createInsertSchema(Faqs);

export type TFaqBase = typeof Faqs.$inferSelect;
export type TInsertFaq = typeof insertFaqsSchema;
export type TNewFaq = typeof Faqs.$inferInsert;

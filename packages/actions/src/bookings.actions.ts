"use server";
import { and, count, eq, gte, lte, or } from "@repo/db";
import { db, Bookings, BookingPayments } from "@repo/db";
import type { TNewBooking, TNewBookingPayment } from "@repo/db";

type TGetBookingsFilters = {
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
  payment_status?: string;
  check_in_date_from?: Date;
  check_in_date_to?: Date;
  room_type_id?: number;
};

export const getBookings = async (filters: TGetBookingsFilters = {}) => {
  if (!db) return { bookings: [], total: 0 };

  const conditions = [];
  
  if (filters.search) {
    conditions.push(
      or(
        eq(Bookings.guest_name, filters.search),
        eq(Bookings.guest_email, filters.search),
        eq(Bookings.guest_phone, filters.search),
        eq(Bookings.confirmation_code, filters.search)
      )
    );
  }
  
  if (filters.status) {
    conditions.push(eq(Bookings.booking_status, filters.status as any));
  }
  
  if (filters.payment_status) {
    conditions.push(eq(Bookings.payment_status, filters.payment_status as any));
  }
  
  if (filters.check_in_date_from) {
    conditions.push(gte(Bookings.check_in_date, filters.check_in_date_from.toISOString().split('T')[0]));
  }
  
  if (filters.check_in_date_to) {
    conditions.push(lte(Bookings.check_in_date, filters.check_in_date_to.toISOString().split('T')[0]));
  }
  
  if (filters.room_type_id) {
    conditions.push(eq(Bookings.room_type_id, filters.room_type_id));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(Bookings)
    .where(where);

  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, filters.limit || 10);
  const offset = (page - 1) * limit;

  const bookings = await db.query.Bookings.findMany({
    where,
    limit,
    offset,
    with: {
      roomType: true,
      room: true,
      user: true,
      payments: true,
    },
    orderBy: (bookings, { desc }) => [desc(bookings.created_at)],
  });

  return {
    bookings,
    total,
  };
};

export const createBooking = async (data: TNewBooking) => {
  if (!db) throw new Error("Database connection not available");

  // Generate confirmation code
  const confirmationCode = `BK${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`;
  
  const [booking] = await db
    .insert(Bookings)
    .values({
      ...data,
      confirmation_code: confirmationCode,
    })
    .returning();
  
  return booking;
};

export const updateBooking = async (
  id: number,
  data: Partial<TNewBooking>
) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Bookings)
    .set({ ...data, updated_at: new Date() })
    .where(eq(Bookings.id, id))
    .returning();
  
  return updated;
};

export const getBookingById = async (id: number) => {
  if (!db) return null;

  return db.query.Bookings.findFirst({
    where: eq(Bookings.id, id),
    with: {
      roomType: {
        with: {
          images: { with: { image: true } },
        },
      },
      room: true,
      user: true,
      payments: {
        orderBy: (payments, { desc }) => [desc(payments.paid_at)],
      },
    },
  });
};

export const getBookingByConfirmationCode = async (code: string) => {
  if (!db) return null;

  return db.query.Bookings.findFirst({
    where: eq(Bookings.confirmation_code, code),
    with: {
      roomType: true,
      room: true,
      payments: true,
    },
  });
};

export const addBookingPayment = async (data: TNewBookingPayment) => {
  if (!db) throw new Error("Database connection not available");

  const [payment] = await db
    .insert(BookingPayments)
    .values(data)
    .returning();
  
  // Update booking paid amount
  const booking = await db.query.Bookings.findFirst({
    where: eq(Bookings.id, data.booking_id),
  });
  
  if (booking) {
    const newPaidAmount = Number(booking.paid_amount) + Number(data.amount);
    const totalAmount = Number(booking.total_amount);
    
    let paymentStatus: "pending" | "partial" | "paid" | "refunded" = "partial";
    if (newPaidAmount >= totalAmount) {
      paymentStatus = "paid";
    } else if (newPaidAmount === 0) {
      paymentStatus = "pending";
    }
    
    await db
      .update(Bookings)
      .set({
        paid_amount: newPaidAmount.toString(),
        payment_status: paymentStatus,
      })
      .where(eq(Bookings.id, data.booking_id));
  }
  
  return payment;
};

export const cancelBooking = async (id: number, reason?: string) => {
  if (!db) throw new Error("Database connection not available");

  const [cancelled] = await db
    .update(Bookings)
    .set({
      booking_status: "cancelled",
      cancelled_at: new Date(),
      cancellation_reason: reason,
    })
    .where(eq(Bookings.id, id))
    .returning();
  
  return cancelled;
};


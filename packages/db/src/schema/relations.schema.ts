import { relations } from 'drizzle-orm';

import { Amenities } from './amenities.schema';
import { Users } from './auth.schema';
import { BlogImages, Blogs } from './blogs.schema';
import { BookingPayments, Bookings } from './bookings.schema';
import { Faqs } from './faqs.schema';
import { Gallery } from './gallery.schema';
import { Images } from './images.schema';
import { Policies } from './policies.schema';
import { Resort, ResortFaqs, ResortImages, ResortPolicies } from './resort.schema';
import {
    RoomTypeAmenities, RoomTypeFaqs, RoomTypeImages, RoomTypePolicies, RoomTypes
} from './room-types.schema';
import { Rooms } from './rooms.schema';
import { Testimonials } from './testimonials.schema';

export const resortRelations = relations(Resort, ({ many }) => ({
  faqs: many(ResortFaqs),
  gallery: many(Gallery),
  images: many(ResortImages),
  policies: many(ResortPolicies),
  rooms: many(Rooms),
  roomTypes: many(RoomTypes),
  testimonials: many(Testimonials),
}));

export const resortImagesRelations = relations(ResortImages, ({ one }) => ({
  image: one(Images, {
    fields: [ResortImages.image_id],
    references: [Images.id],
  }),
  resort: one(Resort, {
    fields: [ResortImages.resort_id],
    references: [Resort.id],
  }),
}));

export const resortPoliciesRelations = relations(ResortPolicies, ({ one }) => ({
  policy: one(Policies, {
    fields: [ResortPolicies.policy_id],
    references: [Policies.id],
  }),
  resort: one(Resort, {
    fields: [ResortPolicies.resort_id],
    references: [Resort.id],
  }),
}));

export const resortFaqsRelations = relations(ResortFaqs, ({ one }) => ({
  faq: one(Faqs, {
    fields: [ResortFaqs.faq_id],
    references: [Faqs.id],
  }),
  resort: one(Resort, {
    fields: [ResortFaqs.resort_id],
    references: [Resort.id],
  }),
}));

export const roomTypeRelations = relations(RoomTypes, ({ many, one }) => ({
  amenities: many(RoomTypeAmenities),
  bookings: many(Bookings),
  faqs: many(RoomTypeFaqs),
  images: many(RoomTypeImages),
  policies: many(RoomTypePolicies),
  resort: one(Resort, {
    fields: [RoomTypes.resort_id],
    references: [Resort.id],
  }),
  rooms: many(Rooms),
}));

export const roomTypeImagesRelations = relations(RoomTypeImages, ({ one }) => ({
  image: one(Images, {
    fields: [RoomTypeImages.image_id],
    references: [Images.id],
  }),
  roomType: one(RoomTypes, {
    fields: [RoomTypeImages.room_type_id],
    references: [RoomTypes.id],
  }),
}));

export const roomTypeAmenitiesRelations = relations(
  RoomTypeAmenities,
  ({ one }) => ({
    amenity: one(Amenities, {
      fields: [RoomTypeAmenities.amenity_id],
      references: [Amenities.id],
    }),
    roomType: one(RoomTypes, {
      fields: [RoomTypeAmenities.room_type_id],
      references: [RoomTypes.id],
    }),
  })
);

export const roomTypePoliciesRelations = relations(
  RoomTypePolicies,
  ({ one }) => ({
    policy: one(Policies, {
      fields: [RoomTypePolicies.policy_id],
      references: [Policies.id],
    }),
    roomType: one(RoomTypes, {
      fields: [RoomTypePolicies.room_type_id],
      references: [RoomTypes.id],
    }),
  })
);

export const roomTypeFaqsRelations = relations(RoomTypeFaqs, ({ one }) => ({
  faq: one(Faqs, {
    fields: [RoomTypeFaqs.faq_id],
    references: [Faqs.id],
  }),
  roomType: one(RoomTypes, {
    fields: [RoomTypeFaqs.room_type_id],
    references: [RoomTypes.id],
  }),
}));

export const roomRelations = relations(Rooms, ({ many, one }) => ({
  bookings: many(Bookings),
  resort: one(Resort, {
    fields: [Rooms.resort_id],
    references: [Resort.id],
  }),
  roomType: one(RoomTypes, {
    fields: [Rooms.room_type_id],
    references: [RoomTypes.id],
  }),
}));

export const bookingRelations = relations(Bookings, ({ many, one }) => ({
  payments: many(BookingPayments),
  room: one(Rooms, {
    fields: [Bookings.room_id],
    references: [Rooms.id],
  }),
  roomType: one(RoomTypes, {
    fields: [Bookings.room_type_id],
    references: [RoomTypes.id],
  }),
  user: one(Users, {
    fields: [Bookings.user_id],
    references: [Users.id],
  }),
}));

export const bookingPaymentsRelations = relations(
  BookingPayments,
  ({ one }) => ({
    booking: one(Bookings, {
      fields: [BookingPayments.booking_id],
      references: [Bookings.id],
    }),
  })
);

export const blogRelations = relations(Blogs, ({ many, one }) => ({
  author: one(Users, {
    fields: [Blogs.author_id],
    references: [Users.id],
  }),
  featuredImage: one(Images, {
    fields: [Blogs.featured_image_id],
    references: [Images.id],
  }),
  images: many(BlogImages),
}));

export const blogImagesRelations = relations(BlogImages, ({ one }) => ({
  blog: one(Blogs, {
    fields: [BlogImages.blog_id],
    references: [Blogs.id],
  }),
  image: one(Images, {
    fields: [BlogImages.image_id],
    references: [Images.id],
  }),
}));

export const galleryRelations = relations(Gallery, ({ one }) => ({
  image: one(Images, {
    fields: [Gallery.image_id],
    references: [Images.id],
  }),
  resort: one(Resort, {
    fields: [Gallery.resort_id],
    references: [Resort.id],
  }),
  videoThumbnail: one(Images, {
    fields: [Gallery.video_thumbnail_id],
    references: [Images.id],
  }),
}));

export const testimonialRelations = relations(Testimonials, ({ one }) => ({
  guestAvatar: one(Images, {
    fields: [Testimonials.guest_avatar_id],
    references: [Images.id],
  }),
  resort: one(Resort, {
    fields: [Testimonials.resort_id],
    references: [Resort.id],
  }),
  user: one(Users, {
    fields: [Testimonials.user_id],
    references: [Users.id],
  }),
}));

export const amenityRelations = relations(Amenities, ({ many }) => ({
  roomTypes: many(RoomTypeAmenities),
}));

export const policyRelations = relations(Policies, ({ many }) => ({
  resorts: many(ResortPolicies),
  roomTypes: many(RoomTypePolicies),
}));

export const faqRelations = relations(Faqs, ({ many }) => ({
  resorts: many(ResortFaqs),
  roomTypes: many(RoomTypeFaqs),
}));

export const imageRelations = relations(Images, ({ many }) => ({
  blogImages: many(BlogImages),
  resortImages: many(ResortImages),
  roomTypeImages: many(RoomTypeImages),
}));

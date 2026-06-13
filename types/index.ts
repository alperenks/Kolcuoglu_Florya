export interface MenuVariant {
  name: string
  price: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  categorySlug: string
  imageUrl: string
  ingredients?: string[]
  allergens?: string[]
  isSignature?: boolean
  isFeatured?: boolean
  weight?: string
  preparationTime?: string
  variants?: MenuVariant[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
}

export interface ReservationForm {
  date: string
  time: string
  guests: number
  firstName: string
  lastName: string
  email: string
  phone: string
  notes?: string
  cardNumber?: string
  cardName?: string
  cardExpiry?: string
  cardCvv?: string
}

export interface Reservation extends ReservationForm {
  id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

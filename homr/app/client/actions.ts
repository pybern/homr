'use server'

import { listings } from './data'

export async function searchListings(query: string) {
  const search = query.toLowerCase()
  return listings.filter(listing => 
    listing.title.toLowerCase().includes(search) ||
    listing.description.toLowerCase().includes(search)
  )
} 
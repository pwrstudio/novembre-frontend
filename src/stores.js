import { writable } from 'svelte/store'

// WRITABLE
export const navigationColor = writable('white')
export const menuActiveGlobal = writable(false)
export const pages = writable([])
export const menuBanners = writable([])
export const feedBanners = writable([])
export const overlayBanners = writable([])
export const activeCategory = writable('')
export const activeQuery = writable('')
export const scrollListActive = writable(false)
export const satelliteSiteActive = writable(false)
import { writable } from 'svelte/store'

// WRITABLE
export const navigationColor = writable('white')
export const menuActiveGlobal = writable(false)
export const pages = writable([])
export const activeCategory = writable('')
export const activeQuery = writable('')
export const scrollListActive = writable(false)



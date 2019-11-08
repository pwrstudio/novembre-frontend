import { writable } from 'svelte/store'

// WRITABLE
export const navigationColor = writable('white')
export const menuActiveGlobal = writable(false)
export const pages = writable([])
import { atom } from 'jotai'

export const signerRequestIdAtom = atom<string | null>(null)
export const needsNewSignerAtom = atom(false)

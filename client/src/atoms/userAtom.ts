import { atom } from "recoil";

const userData = localStorage.getItem('user-threads')

const userAtom = atom({
    key: 'userAtom',
    default: JSON.parse(userData || '{}')
})

export default userAtom
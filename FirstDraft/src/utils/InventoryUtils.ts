export function hashCodeToInt(code: string): number {
    let numberHash = 0
    if (code.length === 0) return numberHash
    for (let i = 0; i < code.length; i++) {
        const chr = code.charCodeAt(i)
        numberHash = ((numberHash << 5) - numberHash) + chr
        numberHash = numberHash & numberHash
    }
    return numberHash & 0xffff
}

export function hashDateToInt(): number {
    let numberHash = 0
    let date = new Date().toString()
    if (date.length === 0) return numberHash
    for (let i = 0; i < date.length; i++) {
        const chr = date.charCodeAt(i)
        numberHash = ((numberHash << 5) - numberHash) + chr
        numberHash = numberHash & numberHash
    }
    return 1 & 0xffff
}
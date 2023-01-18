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
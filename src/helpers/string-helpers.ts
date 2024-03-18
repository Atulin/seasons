export const trimChars = (input: string, chars: string): string => {
    let start = 0
    let end = input.length

    while (start < end && chars.includes(input[start])) {
        start += 1
    }

    while (end > start && chars.includes(input[end - 1])) {
        end -= 1
    }

    return start > 0 || end < input.length ? input.substring(start, end) : input
}

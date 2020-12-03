type language = 'zh' | 'zh-HK' | 'en' | 'th' | 'ug'

declare function getLocale(word: string): string

declare function setLocale(language: language): void

export { getLocale, setLocale }

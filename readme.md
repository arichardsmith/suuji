# 数字（Suuji）

Parse and generate Japanese numbers.

## Install

```
yarn add @arichardsmith/suuji
```

## Formats

This packages can parse or generate text in 3 formats:

- Kanji e.g. 七百五十二
- Hiragana e.g. ななひゃくごじゅうに
- Digit e.g. 七五二

## Usage

Each format can be accessed via:

```ts
import { kanji, hiragana, digit } from '@arichardsmith/suuji'
kanji.parse('七百五十二') // 752
kanji.generate(752) // 七百五十二
```

### Parsing

Parse text using `parse(text: string): number`. Parse will throw an error if it encounters unknown text

### Generation

Generate text using `generate(number: number): string`

## Limitations

- No support for negatives
- No support for fractions
- No support for numbers > 10^20 (it wouldn't be hard but it's not necessary)

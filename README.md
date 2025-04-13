# CoinCalc

[![Test and Lint](https://github.com/kefir500/coincalc/actions/workflows/test-and-lint.yml/badge.svg?event=push)](https://github.com/kefir500/coincalc/actions/workflows/test-and-lint.yml)

🪙🪙🪙

Ever wondered how tall a tower of coins would be
if you stacked $10,000 worth of dimes?
Or how much your salary would weigh in pennies?
Or whether it would reach the Moon?

**CoinCalc** is a little web app that calculates the height, weight, volume,
and number of coins you'd need to build a money tower —
whether it's made of pennies, nickels, euros, or other currencies.

Great for:
- Satisfying odd curiosities
- Math nerds and coin collectors
- Teachers looking for classroom fun
- Building towers you'll never actually build (or will you?)

Choose a coin, input an amount, and see how far things get.

[Try it out!](https://qwertycube.com/coincalc/)

### Features

- Friendly visual interface
- Choose from real-world coins:
  - `EUR` Euro
  - `GBP` United Kingdom Sterling
  - `KZT` Kazakhstani Tenge
  - `RUB` Russian Ruble
  - `UAH` Ukrainian Hryvnia
  - `USD` United States Dollar
- Calculates:
  - Total number of coins
  - Total height
  - Total mass
  - Total volume

## Disclaimer

This project was created for fun.

While the calculations are based on real-world coin specs
and have been reviewed for reasonable accuracy,
they may include assumptions, approximations, or simplifications.

The results should not be used for financial planning, engineering applications,
or any real-world structural design involving physical coins.

## Development

### Contributing

I would be happy to accept PRs with new currencies, real-life data, code fixes and improvements.
However, please avoid adding less commonly used currencies,
and focus on widely circulated official coins.

### Setup

| Command             | Description          |
| ------------------- | -------------------- |
| `npm install`       | Install dependencies |
| `npm run dev`       | Run for Development  |
| `npm run build`     | Build for Production |
| `npm run test:unit` | Run Unit Tests       |
| `npm run lint`      | Lint the code        |

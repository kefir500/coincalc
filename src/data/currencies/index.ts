import { Coin, type ICoin, type ICurrency } from '@/types/currency';
import eur from './eur.json';
import gbp from './gbp.json';
import kzt from './kzt.json';
import rub from './rub.json';
import uah from './uah.json';
import usd from './usd.json';

function fromJson(json: ICurrency): ICurrency {
  return {
    ...json,
    coins: json.coins.map((coin: ICoin) => new Coin(coin)),
  };
}

export default <ICurrency[]>[
  fromJson(eur),
  fromJson(gbp),
  fromJson(kzt),
  fromJson(rub),
  fromJson(uah),
  fromJson(usd),
];

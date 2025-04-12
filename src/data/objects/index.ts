import { Milligram, Micrometer } from '@/types/measurement';
import heights from './heights.json';
import masses from './masses.json';

export default {
  heights: heights.map((obj) => ({ ...obj, height: new Micrometer(BigInt(obj.height)) })),
  masses: masses.map((obj) => ({ ...obj, mass: new Milligram(BigInt(obj.mass)) })),
};

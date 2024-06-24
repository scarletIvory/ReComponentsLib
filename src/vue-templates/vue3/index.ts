import { getVue3Template } from './lib';
import utils from './utils';
import types from './types';

export const generateVue3Template = (name: string) => {
  const lib = getVue3Template(name);
  return [
    ...lib,
    ...utils,
    ...types,
  ];
};

import chai from 'chai';

import { normalizeString } from '../helpers/Helpers';

const expect = chai.expect;

describe('Normalize string', () => {
  const displayName = 'andela';
  it.only('should be a function', () => {
    expect(normalizeString).to.be.a('function');
  });
  it('should return a string with the first character as uppercase',
    () => {
      expect(normalizeString(displayName)).equal('Andela');
    });
});

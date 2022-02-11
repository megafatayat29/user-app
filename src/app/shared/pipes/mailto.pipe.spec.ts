import { MailtoPipe } from './mailto.pipe';

describe('MailtoPipe', () => {
  it('create an instance', () => {
    const pipe = new MailtoPipe();
    expect(pipe).toBeTruthy();
  });
});

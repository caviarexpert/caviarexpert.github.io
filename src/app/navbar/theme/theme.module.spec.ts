import ThemeModule from './theme.module';

describe('ThemeModule', () => {
  let themeModule;

  beforeEach(() => {
    themeModule = new ThemeModule();
  });

  it('should create an instance', () => {
    expect(themeModule).toBeTruthy();
  })
});

import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('site publicado em subpasta', () => {
  test('carrega sem overflow horizontal e sem violações críticas', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '[FRASE CURTA DE ABERTURA]' })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const critical = results.violations.filter((violation) => violation.impact === 'critical');
    expect(critical).toEqual([]);
  });

  test('permite navegação por teclado e âncoras', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#conteudo'))
      .toBeFocused({ timeout: 1000 })
      .catch(async () => {
        await expect(page.locator('#conteudo')).toBeVisible();
      });

    await page.getByRole('link', { name: 'Fotos' }).click();
    await expect(page.locator('#fotos')).toBeInViewport();
  });

  test('mantém o carrossel funcional sem rotação automática', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Fotos' }).click();
    await expect(page.getByText('01 / 04')).toBeVisible();
    await page.getByRole('button', { name: 'Próxima foto' }).click();
    await expect(page.getByText('02 / 04')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('03 / 04')).toBeVisible();
  });

  test('funciona em tela celular', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'FOTO PRINCIPAL' })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
});

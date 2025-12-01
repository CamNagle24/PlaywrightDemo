import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'active to-dos' }).click();
  await page.getByRole('textbox', { name: 'New to-do...' }).click();
  await page.getByRole('textbox', { name: 'New to-do...' }).fill('New To Do');
  await page.getByRole('textbox', { name: 'Category (optional)' }).click();
  await page.getByRole('textbox', { name: 'Category (optional)' }).fill('Category');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('link', { name: 'New To Do' }).click();
  await page.getByRole('textbox', { name: 'Todo Text:' }).click();
  await page.getByRole('textbox', { name: 'Todo Text:' }).fill('New To Do Item');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('listitem').filter({ hasText: 'New To Do ItemCategoryDone' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Done' }).click();
});
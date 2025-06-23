import { test, expect } from '@playwright/test';
import { ApiClient } from './common/apiClient';
import { Post } from "./common/types";

let context: ApiClient;
test.describe('API Tests for JSONPlaceholder', { tag: '@api' }, () => {
    test.beforeEach(async ({ request }) => {
        context = new ApiClient(request);
    });

    test('Fetch all posts', async ({ request }) => {
        const response = await context.get(`posts`);
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        expect(posts).toHaveLength(100);
    });

    test('Fetch a single post by id=1', async ({ request }) => {
        const response = await context.get(`posts/1`);
        expect(response.ok()).toBeTruthy()
        const post = await response.json();
        expect(post.id).toBe(1);
    });

    test('Fetch all comments', async ({ page, request }) => {
        const response = await context.get(`comments`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.length).toBeGreaterThan(0);
    });

    test('Fetch comments for post id=1', async ({ request }) => {
        const response = await context.get(`comments?postId=1`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.every(comment => comment.postId === 1)).toBe(true);
    });

    test('Fetch comments for post id=xyz returns empty set', async ({ request }) => {
        const response = await context.get(`comments?postId=xyz`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.length).toBe(0);
    });

    test('Fetch post id=1 all comments', async ({ request }) => {
        const response = await context.get(`posts/1/comments`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.every(comment => comment.postId === 1)).toBe(true);
    });

    test('Create a new post', async ({ request }) => {
        const newPost: Post = {
            title: 'New post ąęółśżźć',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userId: 1
        };

        const response = await context.post(`posts`, newPost);
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post.title).toBe(newPost.title);
        expect(post.body).toBe(newPost.body);
        expect(post.userId).toBe(1);
    });

    test('Update post id=1', async ({ request }) => {
        const updatedPost: Post = { title: 'Updated title', body: 'Modified content', userId: 1 };
        const response = await context.put(`posts/1`, updatedPost);
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post.title).toBe(updatedPost.title);
        expect(post.body).toBe(updatedPost.body);
        expect(post.userId).toBe(1);
        expect(post.id).toBe(1);
    });

    test('Update only the title of post', async ({ request }) => {
        const patch: Post = { title: 'Patched title' };
        const response = await context.patch('posts/1', patch);
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post.title).toBe(patch.title);
        expect(post.id).toBe(1);
    });

    test('Delete post by id', async ({ request }) => {
        const response = await context.delete(`posts`, 1);
        expect(response.ok()).toBeTruthy();
    });

    test("Fruits - mocks a fruit", async ({ page }) => {
        // Mock the api call before navigating
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [
                { name: 'Strawberry', id: 21 },
                { name: "Apple", id: 6 }
            ];
            await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
        await expect(page.getByText('Apple', { exact: true })).toBeVisible();
    });

    test('Fruits - gets the json from api and adds a new string value', async ({ page }) => {
        // Get the response and add to it
        await page.route('*/**/api/v1/fruits', async route => {
            const response = await route.fetch();
            const json = await response.json();
            json.push({ name: 'playwright by testers talk', id: 100 });
            json.push({ name: 'cypress by testers talk', id: 101 });
            json.push({ name: 'api testing by testers talk', id: 102 });
            json.push({ name: 'postman by testers talk', id: 103 });
            json.push({ name: 'rest assured by testers talk', id: 104 });
            await route.fulfill({ response, json });
        });

        await page.goto('https://demo.playwright.dev/api-mocking');

        await expect(page.getByText('playwright by testers talk')).toBeVisible();
        await expect(page.getByText('cypress by testers talk')).toBeVisible();
        await expect(page.getByText('api testing by testers talk')).toBeVisible();
        await expect(page.getByText('postman by testers talk')).toBeVisible();
        await expect(page.getByText('rest assured by testers talk')).toBeVisible();
    });
});
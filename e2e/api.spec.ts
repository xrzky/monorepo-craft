import { expect, test } from "@playwright/test";

const apiUrl = process.env.E2E_API_URL ?? "http://localhost:3000";

test.describe("api", () => {
  test("reports health", async ({ request }) => {
    const response = await request.get(`${apiUrl}/health`);

    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    expect(await response.json()).toMatchObject({ status: "ok" });
  });

  test("echoes a valid message", async ({ request }) => {
    const response = await request.post(`${apiUrl}/echo`, {
      data: { message: "hello from playwright" },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      message: "hello from playwright",
    });
  });

  test("rejects an empty message", async ({ request }) => {
    const response = await request.post(`${apiUrl}/echo`, {
      data: { message: "" },
    });

    expect(response.status()).toBe(400);
  });

  test("rejects a missing message", async ({ request }) => {
    const response = await request.post(`${apiUrl}/echo`, {
      data: {},
    });

    expect(response.status()).toBe(400);
  });
});

import { test, expect } from '@playwright/test';

test('should create a bug report', async ({ request }) => {
  const respObj = await request.get(`/`, {
  });
  expect(respObj.ok()).toBeTruthy();
});

test('should have response json', async ({ request }) => {
  const respObj = await request.get(`/`, {
  });

  console.log('checking response header content-type');
  const contentTypeHeader = respObj.headers()['content-type'];
  expect(contentTypeHeader).toBe('application/json');

  console.log('checking response header content-type - 2');
  expect(respObj.headers()).toHaveProperty('content-type', 'application/json');

  console.log('checking response code');
  expect(respObj.ok());


  expect(await respObj.json()).toEqual(
    {
      code: 1,
      message: 'Server is running to serve requests'
    }
  );

});


test('should containEqual response json', async ({ request }) => {
  const respObj = await request.get(`/projects`, {
  });

  expect(await respObj.json()).toContainEqual(
    {
      projectcode: 101,
      technology: 'MEAN Full-stack',
      scope: 'development'
    }
  );

});

test('should have proper response schema', async ({ request }) => {
  const respObj = await request.get(`/user`, {
  });

  const responseBody = await respObj.json();

  // Define your expected schema
  const expectedUserSchema = {
    code: expect.any(Number),
    name: expect.any(String),
    gender: expect.any(String),
    techProficiency: expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        techName: expect.any(String)
      })
    ]

    )
    };

  
  // Assert the response matches the schema
  console.log('checking response schema');
  console.log('responseBody : ' + JSON.stringify(responseBody) + ' --  and expectedUserSchema: ' + JSON.stringify(expectedUserSchema));
  expect(responseBody).toMatchObject(expectedUserSchema);

});


/*
*/


/*
test('check response header', async ({ page }) => {
  // Intercept the network request
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url() === 'http://localhost:8000/' && response.status() === 200),
    page.goto('http://localhost:8000/'),
  ]);

  // Check for a specific header
  const contentTypeHeader = response.headers()['content-type'];
  expect(contentTypeHeader).toBe('application/text');
  
  // Alternatively, you can use the header method directly
  //expect(response.headers()).toHaveProperty('content-type', 'application/json');
});
*/
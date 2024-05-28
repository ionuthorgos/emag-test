describe('template spec', () => {
  it('API test return json with a list of users', () => {
    cy.request('GET', 'http://localhost:3000/users')
      .then((response) => {
        // Assert the response status
        expect(response.status).to.eq(200);

        // Assert the response body
        const users = response.body.users;
        cy.log(JSON.stringify(users));

        expect(users).to.deep.include({ id: 1, name: 'john doe' });
        expect(users).to.deep.include({ id: 2, name: 'anna boe' });
      })
  })

  it('API test endpoint /new returns expected text', () => {
    cy.request('GET', 'http://localhost:3000/users')
      .then((response) => {
        // Assert the response status
        expect(response.status).to.eq(200);

        // Assert the response body
        const responseBody = response.body;
        cy.log(JSON.stringify(responseBody));

        expect(responseBody).to.have.property('message', 'Here is the list of users');
      })
  })

  it('API test endpoint /nonexisting returns 404 status', () => {
    cy.request({
      url: 'http://localhost:3000/nonexisting',
      failOnStatusCode: false
    }).then((response) => {
      // Assert the response status
      expect(response.status).to.eq(404);
    });
  });

  it('Should return 301 for the redirect endpoint', () => {
    cy.request({
      url: 'http://localhost:3000/redirect',
      followRedirect: false 
    }).then((response) => {
      // Assert the response status
      expect(response.status).to.eq(301);

      // Assert the location header
      expect(response.headers).to.have.property('location', 'https://emagtest.com');
    });
  });

  it('Add a new user to the list', () => {
    let newUser = { id: 3, name: "emag user" }

    cy.request('POST', 'http://localhost:3000/users', newUser)
      .then((response) => {
        // Assert the response status
        expect(response.status).to.eq(201);

        // Assert the response body
        const users = response.body.users;
        cy.log(JSON.stringify(users));

        // Check that the response includes the new user object
        expect(users).to.deep.include(newUser);
      });
  });
});


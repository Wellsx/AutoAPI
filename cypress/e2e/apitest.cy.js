import Data from '../support/data';
describe('petstore.swagger API tests', () => {
  it('POST - create user', () => {
    cy.request('POST', '/v2/user', {
      username: Data.firstName,
      firstName: Data.firstName,
      lastName: Data.lastName,
      email: Data.email,
      password: Data.password,
      phone: Data.phone,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).have.property('message');
    });
  });

  it('GET - login', () => {
    cy.request('/v2/user/login?username=Test&password=password123').then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).have.property('message');
      }
    );
  });

  it('GET - inventory', () => {
    cy.request('/v2/store/inventory').then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('POST - add pet', () => {
    cy.request('POST', '/v2/pet', {
      id: 754366,
      category: {
        id: 0,
        name: 'Cat',
      },
      name: 'Arci',
      status: 'available',
    }).then((response) => {
      expect(response.body).have.property('name', 'Arci'),
        expect(response.status).to.equal(200);
    });
  });

  it('GET - pet id', () => {
    cy.request('/v2/pet/754366').then((response) => {
      expect(response.body).have.property('id', 754366),
        expect(response.status).to.equal(200);
    });
  });

  it('POST - order pet', () => {
    cy.request('POST', '/v2/store/order', {
      id: 0,
      petId: 754366,
      quantity: 1,
      shipDate: 0,
      status: 'placed',
      complete: true,
    }).then((response) => {
      expect(response.body).have.property('petId', 754366),
        expect(response.body).have.property('complete', true);
      expect(response.status).to.equal(200);
    });
  });

  it('PUT - update pet', () => {
    cy.request('PUT', '/v2/pet', {
      id: 754366,
      category: {
        id: 0,
        name: 'Cat',
      },
      name: 'Arci',
      status: 'sold',
    }).then((response) => {
      expect(response.body).have.property('status', 'sold');
    });
  });

  it('DELETE - delete pet', () => {
    cy.request('DELETE', '/v2/pet/754366').then((response) => {
      expect(response.status).to.equal(200),
        expect(response.body).have.property('message', '754366');
    });
  });

  it('GET - logout', () => {
    cy.request('/v2/user/logout').then((response) => {
      expect(response.status).to.equal(200),
        expect(response.body).have.property('message', 'ok');
    });
  });
});

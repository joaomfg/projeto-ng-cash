import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import app from '../app';
import User from '../database/models/user';
import {
  validLogin,
  mockLogin,
  invalidUsername,
  invalidPassword,
  validToken,
  invalidToken,
  mockUserInfo,
  mockUserAccount,
  mockUserTransaction,
  validateResponse,
  mockAccount,
  validRegister,
} from './mocks';

import { Response } from 'superagent';
import Transaction from '../database/models/transaction';
import JwtValidation from '../auth/jwt';
import Account from '../database/models/account';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests of Login/Register', () => {
  let response: Response;

  describe('/login route', () => {
    describe('with the right requisition', () => {

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User)
      });

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      });

      it('should return a token with the 200 status', async () => {
        response = await chai
          .request(app)
          .post('/login')
          .send(validLogin);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
      });
    });

    describe('invalid username/password', () => {
      it('should return the message: "Username/Password is required" whit status 400', async () => {
        response = await chai
          .request(app)
          .post('/login')
          .send({});

        expect(response.status).to.equal(400);
        expect(response.body.message[0].message).to.deep.equal('Username is required');
        expect(response.body.message[1].message).to.deep.equal('Password is required');
      });

      it('should return the error that is too small, whit status 400', async () => {
        response = await chai
          .request(app)
          .post('/login')
          .send({
            username: 'ed',
            password: '1234567'
          });

        expect(response.status).to.equal(400);
        expect(response.body.message[0].message).to.deep.equal('String must contain at least 3 character(s)');
        expect(response.body.message[1].message).to.deep.equal('String must contain at least 8 character(s)');
      });
    });

    describe('with incorrect username', () => {
      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(undefined)
      });

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('should return the message: "Incorrect Username" whit status 401', async () => {
        response = await chai
          .request(app)
          .post('/login')
          .send(invalidUsername);

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ error: 'Incorrect username' });
      });
    });

    describe('with incorrect password', () => {
      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User)
      });

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('should return the message: "Incorrect Password" whit status 401', async () => {
        response = await chai
          .request(app)
          .post('/login')
          .send(invalidPassword);

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ error: 'Incorrect password' });
      });
    });
  });

  describe('/login/validate route', () => {
    describe('with the right requisition', () => {

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User);

        sinon
          .stub(User, 'findByPk')
          .resolves(mockUserAccount as User);

        sinon
          .stub(Transaction, 'findAll')
          .resolves(mockUserTransaction as any);
      });

      after(() => {
        sinon.restore();
      });

      it('should return the user info and transactions with the 200 status', async () => {
        response = await chai
          .request(app)
          .post('/login/validate')
          .set('authorization', validToken);

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(validateResponse);
      });
    });

    describe('with invalid/none token', () => {

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User)
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should return "Token not found" with the 401 status', async () => {
        response = await chai
          .request(app)
          .post('/login/validate');

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: 'Token not found' });
      });

      it('should return "Expired token" with the 401 status', async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(null);

        response = await chai
          .request(app)
          .post('/login/validate')
          .set('authorization', validToken);

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: 'Expired token' });
      });

      it('should return "Invalid token" with the 401 status', async () => {
        response = await chai
          .request(app)
          .post('/login/validate')
          .set('authorization', invalidToken);

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ error: 'Invalid token' });
      });
    });
  });

  // Como as funcções do JWT já foram testadas, elas não serão consideradas daqui pra frente

  describe('/login/:id route', () => {
    describe('with the right requisition', () => {

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(mockUserInfo as User);
      });

      after(() => {
        sinon.restore();
      });

      it('should return the user info with the 200 status', async () => {
        const accountId = 1;

        response = await chai
          .request(app)
          .get(`/login/${accountId}`)
          .set('authorization', validToken);

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(mockUserInfo);
        expect(response.body.accountId).to.equal(accountId);
      });
    });

    describe('with an invalid accountId', () => {

      before(async () => {

        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User)
          .onSecondCall()
          .resolves(null);
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should return "User not found" with the 404 status', async () => {
        const accountId = 9999;

        response = await chai
          .request(app)
          .get(`/login/${accountId}`)
          .set('authorization', validToken);

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ error: 'User not found' });
      });
    });
  });

  describe('/login/register route', () => {
    describe('with the right requisition', () => {

      before(async () => {
        sinon
          .stub(Account, 'create')
          .resolves(mockAccount as Account);

        sinon
          .stub(User, 'create')
          .resolves(mockLogin as User);

        sinon
          .stub(User, 'findOne')
          .resolves(null);
      });

      after(() => {
        sinon.restore();
      });

      it('should return a token with the 200 status', async () => {
        response = await chai
          .request(app)
          .post('/login/register')
          .send(validRegister)

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
      });
    });

    describe('with an existing username', () => {

      before(async () => {

        sinon
          .stub(User, 'findOne')
          .resolves(mockLogin as User);
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should return "This username is taken" with the 409 status', async () => {
        response = await chai
          .request(app)
          .post('/login/register')
          .send(validLogin)

        expect(response.status).to.equal(409);
        expect(response.body).to.deep.equal({ error: 'This username is taken' });
      });
    });
  });
});

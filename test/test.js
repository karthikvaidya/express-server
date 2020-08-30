const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server } = require('../src/app');

chai.should();
chai.use(chaiHttp);

describe('Test APIs', () => {
	/**
	 * Sign Up API
	 * Positive use case
	 */
	describe('POST /auth/signup', () => {
		it('It should sign up a user to system', (done) => {
			const payload = {
				firstName: 'Admin',
				lastName: 'admin',
				email: 'admin@test.com',
				phoneNumber: '9988776655',
				countryCode: '91',
				userRole: 'admin',
				password: 'Test@1234',
			};
			chai
				.request(server)
				.post('/api/v1/auth/login')
				.send(payload)
				.end((err, response) => {
					response.should.have.status(201);
					response.body.payload.success.should.eq(true);
					done();
				});
		});
	});

	/** Negative use case */

	describe('POST /auth/signup', () => {
		it('It should fail, as user already exists', (done) => {
			const payload = {
				firstName: 'Admin',
				lastName: 'admin',
				email: 'admin@test.com',
				phoneNumber: '9988776655',
				countryCode: '91',
				userRole: 'admin',
				password: 'Test@1234',
			};
			chai
				.request(server)
				.post('/api/v1/auth/login')
				.send(payload)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.payload.success.should.eq(false);
					response.body.payload.should.have.property('reason');
					response.body.payload.reason.should.be.eq(
						'User with email address admin@test.com already exists'
					);
					done();
				});
		});
	});

	/**
	 * Login API
	 */
	describe('POST /auth/login', () => {
		it('It should allow the user to login to the system', (done) => {
			const payload = {
				email: 'admin@test.com',
				password: 'Test@1234',
			};
			chai
				.request(server)
				.post('/api/v1/auth/login')
				.send(payload)
				.end((err, response) => {
					response.should.have.status(201);
					response.body.payload.success.should.eq(true);
					response.body.payload.user.should.be.a('object');
					response.body.payload.user.should.have.property('userId');
					response.body.payload.user.should.have.property('firstName');
					response.body.payload.user.should.have.property('lastName');
					response.body.payload.user.should.have.property('role');
					response.body.payload.user.should.have.property('token');
					done();
				});
		});
	});
});

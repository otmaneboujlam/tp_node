const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Biere = require('../models/biere');
const biereController = require('../controllers/biereController');

jest.mock('../models/biere');

const app = express();
app.use(bodyParser.json());

app.post('/biere/:id_bar', biereController.addBiereToBar);
app.put('/biere/:id_biere', biereController.updateBiere);
app.delete('/biere/:id_biere', biereController.deleteBiere);
app.get('/biere/bars/:id_bar', biereController.getBieresByBar);
app.get('/biere/:id_biere', biereController.getBiereById);

describe('Biere Controller', () => {
    let biere;

    beforeEach(() => {
        biere = {
            id: 1,
            name: 'Test Beer',
            description: 'Test Description',
            degree: 5.0,
            prix: 10.0,
            bars_id: 1,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /biere/:id_bar - should add a beer to a bar', async () => {
        Biere.create.mockResolvedValue(biere);

        const response = await request(app)
            .post('/biere/1')
            .send(biere);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(biere);
    });

    test('PUT /biere/:id_biere - should update a beer', async () => {
        Biere.findByPk.mockResolvedValue({
            ...biere,
            save: jest.fn().mockResolvedValue(biere),
        });

        const response = await request(app)
            .put('/biere/1')
            .send(biere);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(biere);
    });

    test('DELETE /biere/:id_biere - should delete a beer', async () => {
        Biere.findByPk.mockResolvedValue({
            ...biere,
            destroy: jest.fn().mockResolvedValue(),
        });

        const response = await request(app)
            .delete('/biere/1');

        expect(response.status).toBe(204);
    });

    test('GET /biere/bars/:id_bar - should list beers of a bar', async () => {
        Biere.findAll.mockResolvedValue([biere]);

        const response = await request(app)
            .get('/biere/bars/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([biere]);
    });

    test('GET /biere/:id_biere - should get details of a beer', async () => {
        Biere.findByPk.mockResolvedValue(biere);

        const response = await request(app)
            .get('/biere/1');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(biere);
    });
});

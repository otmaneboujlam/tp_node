const { addBiereToCommande, removeBiereFromCommande } = require('../controllers/biere_commandeController');
const { BiereCommande } = require('../models/models');

jest.mock('../models/models', () => ({
  BiereCommande: {
    create: jest.fn(),
    destroy: jest.fn(),
  },
}));

const mockReq = (params) => ({
  params,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('addBiereToCommande', () => {
  it('should add biere to commande and return created object', async () => {
    const req = mockReq({ id_biere: '1', id_commande: '1' });
    const res = mockRes();

    const mockBiereCommande = { id: 1, biere_id: 1, commande_id: 1 };
    BiereCommande.create.mockResolvedValue(mockBiereCommande);

    await addBiereToCommande(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBiereCommande);
  });

  it('should return error if ids are not numbers', async () => {
    const req = mockReq({ id_biere: 'abc', id_commande: 'xyz' });
    const res = mockRes();

    await addBiereToCommande(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Incorrect, les ids doivent être des nombres." });
  });
});

describe('removeBiereFromCommande', () => {
  it('should remove biere from commande and return success', async () => {
    const req = mockReq({ id_biere: '1', id_commande: '1' });
    const res = mockRes();

    BiereCommande.destroy.mockResolvedValue(1);

    await removeBiereFromCommande(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('should return error if ids are not numbers', async () => {
    const req = mockReq({ id_biere: 'abc', id_commande: 'xyz' });
    const res = mockRes();

    await removeBiereFromCommande(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Incorrect, les ids doivent être des nombres." });
  });
});

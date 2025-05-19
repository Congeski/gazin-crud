import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { differenceInYears } from 'date-fns';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  const devs = await prisma.desenvolvedor.findMany({
    include: {
      nivel: true
    }
  });
  if (!devs.length) return res.status(404).json({ message: 'Nenhum desenvolvedor encontrado' });
  const result = devs.map(dev => ({
    ...dev,
    idade: differenceInYears(new Date(), dev.data_nascimento),
  }));
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;
  if (!nome || !sexo || !data_nascimento || !hobby || !nivel_id) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }
  const novo = await prisma.desenvolvedor.create({
    data: {
      nome,
      sexo,
      data_nascimento: new Date(data_nascimento),
      hobby,
      nivel_id
    }
  });
  res.status(201).json(novo);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;
  if (!nome || !sexo || !data_nascimento || !hobby || !nivel_id) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }
  const atualizado = await prisma.desenvolvedor.update({
    where: { id: Number(id) },
    data: {
      nome,
      sexo,
      data_nascimento: new Date(data_nascimento),
      hobby,
      nivel_id
    }
  });
  res.json(atualizado);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.desenvolvedor.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
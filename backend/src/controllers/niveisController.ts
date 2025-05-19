import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  const niveis = await prisma.nivel.findMany({
    include: {
      desenvolvedores: true
    }
  });
  if (!niveis.length) return res.status(404).json({ message: 'Nenhum nível encontrado' });
  res.json(niveis);
};

export const create = async (req: Request, res: Response) => {
  const { nivel } = req.body;
  if (!nivel) return res.status(400).json({ message: 'Campo "nivel" é obrigatório' });
  const novo = await prisma.nivel.create({ data: { nivel } });
  res.status(201).json(novo);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nivel } = req.body;
  if (!nivel) return res.status(400).json({ message: 'Campo "nivel" é obrigatório' });
  const atualizado = await prisma.nivel.update({
    where: { id: Number(id) },
    data: { nivel },
  });
  res.json(atualizado);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const devs = await prisma.desenvolvedor.findMany({ where: { nivel_id: Number(id) } });
  if (devs.length) return res.status(400).json({ message: 'Não é possível remover nível com desenvolvedores associados' });
  await prisma.nivel.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
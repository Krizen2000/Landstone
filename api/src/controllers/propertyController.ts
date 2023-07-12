import Property from "../models/Property";
import { Response } from "express";

type PropertyType = {
  agentId: string;
  type: string;
  name: string;
  price: {
    form: number;
    to: number;
  };
  description: string;
  location: string;
  visibility: boolean;
  interested: string[];
  views: number;
};

export async function propertyCreation(
  req: { body: PropertyType; user: { agentId: string } },
  res: Response
) {
  const matchProperty = await Property.findOne({
    name: req.user.agentId.toLowerCase(),
  });
  if (matchProperty) {
    if (matchProperty.agentId === req.user.agentId) {
      res.status(400).send();
      return;
    }
  }

  const newProperty = new Property({ ...req.body, agentId: req.user.agentId });
  await newProperty.save();

  res.status(201).send();
}

export async function getPropertyInfo(
  req: { body: { propertyId: string }; user: { agentId: string } | null },
  res: Response
) {
  const property = await Property.findById(req.body.propertyId);
  if (!property) {
    res.status(404).send();
    return;
  }
  if (!property.visibility && property.agentId !== (req.user?.agentId ?? "")) {
    res.status(404).send();
    return;
  }

  if (property.agentId == (req.user?.agentId ?? "")) {
    res.status(200).json(property);
    return;
  }
  await Property.findByIdAndUpdate(req.body.propertyId, { $inc: { views: 1 } });
  res.status(200).json(property);
}

type UpdateProperyReq = Request & {
  params: {
    propertyId: string;
  };
  body: Partial<PropertyType>;
  user: { agentId: string };
};
export async function updatePropertyInfo(req: UpdateProperyReq, res) {
  const property = await Property.findById(req.params.propertyId);
  if ((property?.agentId ?? "") !== req.user.agentId) {
    res.status(400).send();
    return;
  }

  await Property.findByIdAndUpdate(req.params.propertyId, req.body);
  res.status(200).send();
}

export async function tagAsInterested(
  req: { params: { propertyId: string }; user: { clientId: string } },
  res: Response
) {
  if (!req.user.clientId) {
    res.status(400).send();
    return;
  }

  await Property.findByIdAndUpdate(req.params.propertyId, {
    $push: { interested: req.user.clientId },
  });
  res.status(200).send();
}

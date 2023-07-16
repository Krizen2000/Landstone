import Property from "../models/Property";
import { NextFunction, Request, Response } from "express";

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
  views: string[];
};
function isPropertyType(obj): obj is PropertyType {
  return (
    typeof obj.agentId === "undefined" &&
    typeof obj.views === "undefined" && // DISABLE BEFORE ADDING TESTING VALUES
    typeof obj.interested === "undefined" && // DISABLE BEFORE ADDING TESTING VALUES
    typeof obj.type === "string" &&
    typeof obj.name === "string" &&
    typeof obj.price.from === "number" &&
    typeof obj.price.to === "number" &&
    typeof obj.description === "string" &&
    typeof obj.location === "string"
  );
}

type PropertyCreationReq = Request & {
  body: PropertyType;
  user: { agentId: string };
};
export async function propertyCreation(
  req: PropertyCreationReq,
  res: Response
) {
  if (!isPropertyType(req.body) || !req.user.agentId || !req.body.name) {
    res.status(400).send();
    return;
  }

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
  const { _id } = await newProperty.save();

  res.status(201).json({ propertyId: _id });
}

type PropertyInfoReq = Request & {
  query: { propertyId: string };
  user: { agentId: string | null; clientId: string | null } | null;
};
export async function getPropertyInfoByPropertyId(
  req: PropertyInfoReq,
  res: Response
) {
  if (!req.query.propertyId) {
    res.status(400).send();
    return;
  }
  const property = await Property.findById(req.query.propertyId);
  if (!property) {
    res.status(404).json({ error: "PROPERTY NOT FOUND" });
    return;
  }
  if (!property.visibility && property.agentId !== (req.user?.agentId ?? "")) {
    res.status(404).json({ error: "PROPERTY NOT FOUND" });
    return;
  }

  if (!req.user?.clientId) {
    res.status(200).json(property);
    return;
  }
  await Property.findByIdAndUpdate(req.query.propertyId, {
    $push: { views: req.user.clientId },
  });
  res.status(200).json(property);
}

export async function getPropertiesByAgentId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.query.agentId) {
    next();
    return;
  }
  const properties = await Property.find({ agentId: req.query.agentId });
  if (!properties) {
    res.status(404).json({ error: "PROPERTIES NOT FOUND" });
    return;
  }
  res.status(200).json({ properties });
}

export async function getPopularProperties(req: Request, res: Response) {
  Property.find()
    .sort({ views: "desc" })
    .limit(Number(req.query.limit) || 3)
    .then((properties) => res.status(200).json({ properties }));
}

type UpdateProperyReq = Request & {
  params: {
    propertyId: string;
  };
  body: Partial<PropertyType>;
  user: { agentId: string };
};
export async function updatePropertyInfo(req: UpdateProperyReq, res: Response) {
  if (!req.user.agentId) {
    res.status(400).send();
    return;
  }

  const property = await Property.findById(req.params.propertyId);
  if ((property?.agentId ?? "") !== req.user.agentId) {
    res.status(400).send();
    return;
  }

  await Property.findByIdAndUpdate(req.params.propertyId, req.body);
  res.status(200).send();
}

type InterestedReq = Request & {
  params: { propertyId: string };
  user: { clientId: string };
};
export async function tagAsInterested(req: InterestedReq, res: Response) {
  if (!req.user.clientId) {
    res.status(400).send();
    return;
  }
  await Property.findByIdAndUpdate(req.params.propertyId, {
    $push: { interested: req.user.clientId },
  });
  res.status(200).send();
}

type DeletePropertyReq = Request & {
  params: { propertyId: string };
  user: { agentId: string };
};
export async function deleteProperty(req: DeletePropertyReq, res: Response) {
  if (!req.user.agentId) {
    res.status(400).send();
    return;
  }
  const property = await Property.findById(req.params.propertyId);
  if ((property && property.agentId) !== req.user.agentId) {
    res.status(400).send();
    return;
  }
  await Property.findByIdAndDelete(req.params.propertyId);
  res.status(200).send();
}

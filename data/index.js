import { faker } from "@faker-js/faker";
import axios from "axios";
import { config } from "dotenv";
config();

async function main() {
  console.log(`process.env.BACKEND_API_URL: ${process.env.BACKEND_API_URL}`);
  if (!process.env.BACKEND_API_URL) {
    console.error("Error: Please add BACKEND_API_URL in .env file");
    process.exit(1);
  }

  // Preparing Data
  let agents = [];
  for (let i = 0; i < 10; i++) {
    const agent = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      contact_no: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    agents.push(agent);
  }

  let clients = [];
  for (let i = 0; i < 60; i++) {
    const client = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      contact_no: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    clients.push(client);
  }

  const designatedPerson = {
    firstName: "John",
    lastName: "Watson",
    contact_no: "99887766",
    email: "john@gmail.com",
    password: "john",
  };
  let propertyTypes = [
    "property",
    "resort",
    "home",
    "apartment",
    "warehouse",
    "storehouse",
  ];
  let properties = [];
  for (let i = 0; i < 30; i++) {
    const randomType = Math.floor(Math.random() * propertyTypes.length);
    const property = {
      type: propertyTypes[randomType],
      name: faker.music.genre(),
      image: faker.image.url(),
      description: faker.lorem.paragraphs(5),
      location: faker.location.city(),
      price: {
        from: Number(faker.finance.amount(1_000_000, 10_000_000)),
        to: Number(faker.finance.amount(10_000_000, 1_00_000_000)),
      },
    };

    properties.push(property);
  }

  // Create new users
  const getAuthToken = async (user, type) => {
    const { data } = await axios.post(
      `${process.env.BACKEND_API_URL}/api/${type}`,
      user
    );
    console.log("data", data);
    if (type === "agents") {
      const { token, agentId } = data;
      return { token, agentId };
    } else {
      const { token, clientId } = data;
      return { token, clientId };
    }
  };
  const agentInfo = await Promise.all(
    agents.map((user) => getAuthToken(user, "agents"))
  );
  const clientInfo = await Promise.all(
    clients.map((user) => getAuthToken(user, "clients"))
  );
  const interestedClientIdGen = (n) =>
    clientInfo.slice(0, n).map((val) => val.clientId);

  const { token: designatedAgentToken, agentId: designatedAgentId } =
    await getAuthToken(designatedPerson, "agents");
  const { token: designatedClientToken, clientId: designatedClientId } =
    await getAuthToken(designatedPerson, "clients");

  // Properties for the designated agent and client
  await Promise.all(
    properties.slice(0, 5).map(async (property) => {
      const randomNumber = Math.floor(Math.random() * (clients.length - 10));
      const propertyInfo = {
        ...property,
        interested: [
          ...interestedClientIdGen(randomNumber),
          designatedClientId,
        ],
        views: [
          ...interestedClientIdGen(randomNumber + 10),
          designatedClientId,
        ],
      };
      await axios.post(
        `${process.env.BACKEND_API_URL}/api/properties`,
        propertyInfo,
        { headers: { Authorization: `bearer ${designatedAgentToken}` } }
      );
    })
  );

  // Publish new properties
  const createProperties = async (property, inx) => {
    const randomNumber = Math.floor(Math.random() * clients.length);
    const token = agentInfo[Math.floor(Math.random() * agents.length)].token;
    const propertyInfo = {
      ...property,
      interested: interestedClientIdGen(randomNumber),
      views: interestedClientIdGen(randomNumber + 10),
    };
    await axios.post(
      `${process.env.BACKEND_API_URL}/api/properties`,
      propertyInfo,
      { headers: { Authorization: `bearer ${token}` } }
    );
  };
  await Promise.all(properties.map(createProperties));
}

main();

import { logger } from "../logs/winston.js";

class ContainerMongoDB {
  constructor(model) {
    this.model = model;
  }

  async createData(data) {
    try {
      const req = new this.model(data).save();
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  async readAllData() {
    try {
      const req = await this.model.find({}, { _id: 1, __v: 0 }).lean();
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  async readOneData(key, value) {
    try {
      if ((key === "id" || key === "_id") && value.length !== 24) {
        return undefined;
      }
      const query = {};
      query[key] = value;
      return await this.model.findOne(query).lean();
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  async readDataFor(key, value) {
    try {
      if ((key === "id" || key === "_id") && value.length !== 24) {
        return undefined;
      }
      const query = {};
      query[key] = value;
      return await this.model.find(query).lean();
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  async updateData(key, value, data) {
    try {
      if ((key === "id" || key === "_id") && value.length !== 24) {
        return undefined;
      }
      const query = {};
      query[key] = value;
      const req = await this.model.findOneAndUpdate(
        query,
        { $set: data },
        { returnOriginal: false }
      );
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  async deleteData(key, value) {
    try {
      if ((key === "id" || key === "_id") && value.length > 24) {
        return undefined;
      }
      const query = {};
      query[key] = value;
      const req = await this.model.findOneAndDelete(query);
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }
}

export default ContainerMongoDB;
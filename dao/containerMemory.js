import { logger } from "../logs/winston.js";
import randomBytes from "crypto";

export const users = [];
export const products = [];

class ContainerMemory {
  constructor(model) {
    this.model = model;
  }

  createData(data) {
    try {
      const newData = {
        ...data,
        _id: randomBytes.randomBytes(16).toString("hex"),
      };
      this.model.push(newData);
      return newData;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  readAllData() {
    try {
      const req = this.model;
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  readOneData(key, value) {
    try {
      const req = this.model.find((data) => data[key] === value);
      return req;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  updateData(key, value, data) {
    try {
      const index = this.model.findIndex((x) => x[key] === value);
      this.model[index] = data;
      return this.model[index];
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  deleteData(key, value) {
    try {
      const req = this.model.filter((x) => x[key] != value);
      this.model = req;
      return this.model;
    } catch (error) {
      logger.error(`error: ${error.message}`);
    }
  }

  clearData() {
    this.model = [];
  }
}

export default ContainerMemory;
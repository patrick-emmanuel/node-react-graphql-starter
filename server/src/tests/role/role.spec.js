import { expect } from "chai";

import * as roleApi from "./fixtures";
import "../helper";

describe("role", function() {
  this.timeout(0);
  this.slow(1000);

  const USER = "USER";
  describe("createRole: Role", () => {
    it("Create a new role", async () => {
      const expectedResult = {
        data: {
          createRole: {
            name: USER
          }
        }
      };
      const { data } = await roleApi.createRole({
        data: {
          name: USER
        }
      });

      expect(data).to.eql(expectedResult);
    });

    it("Should not duplicate name", async () => {
      const { data } = await roleApi.createRole({
        data: {
          name: USER
        }
      });

      const errorMessage =
        "A unique constraint would be violated on Role. Details: Field name = name";
      expect(data.errors[0].message).to.eql(errorMessage);
    });
  });

  describe("role: Role", () => {
    it("Should query role", async () => {
      const USER = "USER";
      const expectedResult = {
        data: {
          role: {
            name: USER
          }
        }
      };
      const { data } = await roleApi.role({
        name: USER
      });

      expect(data).to.eql(expectedResult);
    });
  });
});

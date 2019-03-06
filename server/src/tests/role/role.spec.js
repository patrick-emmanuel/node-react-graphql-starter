import { expect } from "chai";

import * as roleApi from "./fixtures";
import "../helper";

describe("role", function() {
  this.timeout(0);
  this.slow(1000);

  const SOME_ROLE = "SOME_ROLE";
  describe("createRole: Role", () => {
    it("Create a new role", async () => {
      const expectedResult = {
        data: {
          createRole: {
            name: SOME_ROLE
          }
        }
      };
      const { data } = await roleApi.createRole({
        data: {
          name: SOME_ROLE
        }
      });

      expect(data).to.eql(expectedResult);
    });

    it("Should not duplicate name", async () => {
      const { data } = await roleApi.createRole({
        data: {
          name: SOME_ROLE
        }
      });

      const errorMessage =
        "A unique constraint would be violated on Role. Details: Field name = name";
      expect(data.errors[0].message).to.eql(errorMessage);
    });
  });

  describe("role: Role", () => {
    it("Should query role", async () => {
      const expectedResult = {
        data: {
          role: {
            name: SOME_ROLE
          }
        }
      };
      const { data } = await roleApi.role({
        name: SOME_ROLE
      });

      expect(data).to.eql(expectedResult);
    });
  });
});

var { expect } = require("chai");
var sinon = require("sinon");

describe("App", function () {
    it("Should Load", function() {
        expect(require("main.js")).to.be.ok
    })
})

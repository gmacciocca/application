import { Application } from "../src";

describe("Application", function() {
    beforeEach(() => {
        this.delegates = null;
        this.components = [];
        this.configuration = {};
        this.application = new Application(this.delegates, this.components, this.configuration);
    });

    it("implements interface", () => {
        this.application.should.respondTo("destroy");
        this.application.should.respondTo("bootstrap");
        this.application.should.respondTo("shutdown");
        this.application.should.respondTo("localize");
        this.application.should.have.property("stores");
        this.application.should.have.property("configuration");
    });
});

// controller class For Handle Actions

import CrudController from "./CrudController";

abstract class Controller {
    // Static map to store instances of child classes
    private static instances: Map<any, any> = new Map();

    // Protected constructor to prevent direct instantiation
    protected constructor() {
    }

    // Generic static method to get an instance of the child class
    static getInstance<T extends Controller>(this: new () => T): T {
        if (!Controller.instances.has(this)) {
            Controller.instances.set(this, new this());
        }
        return Controller.instances.get(this) as T;
    }
}
export default Controller
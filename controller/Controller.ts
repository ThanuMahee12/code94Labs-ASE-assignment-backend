// controller class For Handle Actions

class Controller{
    private static controller:Controller;
protected constructor(){
}
static getInstace():Controller{
    if(this.controller)return this.controller
    return new Controller()
}
}

export default Controller
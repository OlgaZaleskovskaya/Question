export class Serializable {
    fillFromJSON(obj: Object){
        for (let propName in obj) {
                    this[propName] = obj[propName];
                }
    }
   
}
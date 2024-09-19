export class GridMaker{ 
    x : number
    y : number
    w : number
    h : number
    i : string
    static : boolean
    type : string
    label : string
    required : boolean
    value : null | string | boolean | number
    itemList : Array<string>
    moved : boolean
    constructor(){
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
        this.i = ""
        this.static = false
        this.type = ""
        this.label = ""
        this.required = false
        this.value = null
        this.itemList = []
        this.moved = false
    }
}

export class HeaderCreator{
    type: string
    label: string
    constructor(){
        this.type = ""
        this.label = ""
    }
}
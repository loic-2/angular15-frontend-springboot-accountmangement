
export class Account {
    id!:number
    nom!:string
    prenom!:string
    cni!: string
    numero!:string
    agence!: string
    solde!: string
    constructor(){
    }

    loadFromJson(jsonElement:any){
        Object.assign(this,jsonElement)
    }
}

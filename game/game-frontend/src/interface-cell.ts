export interface InterfaceGrille {
    cellules: InterfaceCell[]
}

export interface InterfaceCell {
    valeur: number
    brouillons?: number[]
    lecture: boolean
    indice: number
}
